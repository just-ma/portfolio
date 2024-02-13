import { Vector3, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { throttle } from "../../constants";
import { useSpring, animated, easings } from "@react-spring/three";
import { useLocation, useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import useIsMobile from "../../hooks/useMobile";

export type ModelProps = {
  opacity: number;
  selected?: boolean;
};

const CanvasBaseObject = ({
  hovering,
  angle,
  distance,
  delayIndex,
  ObjectComponent,
  rootPath,
}: {
  hovering?: boolean;
  angle: number;
  distance: number;
  delayIndex: number;
  ObjectComponent: (props: ModelProps) => JSX.Element;
  rootPath: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const selected = currentPath.startsWith(rootPath);
  const exactSelected = currentPath === rootPath;
  const isHome = currentPath === "/";

  const { titleAnimating } = useAppContext();

  const getOpacity = () => {
    return isHome || selected ? 1 : 0;
  };

  const optimisticOpacity = useRef(getOpacity());
  const jumping = useRef(false);
  const [opacity, setOpacity] = useState(0);
  const [init, setInit] = useState(!isHome);

  const isMobile = useIsMobile();

  const baseRotation = angle - 0.8;

  const baseYPosition = 0.25;
  const hiddenPosition: Vector3 = [
    -Math.cos(angle) * distance * 2,
    baseYPosition,
    Math.sin(angle) * distance * 2,
  ];
  const getPosition = (y?: number): Vector3 => {
    if (isHome) {
      return [
        -Math.cos(angle) * distance,
        (y ?? baseYPosition) * 1.2,
        Math.sin(angle) * distance,
      ];
    }

    if (selected) {
      return [0, (exactSelected ? 1.8 : 2.5) + (isMobile ? 1 : 0), 0];
    }

    return hiddenPosition;
  };

  const [springs, api] = useSpring(
    () => ({
      from: {
        position: isHome ? hiddenPosition : getPosition(),
        scale: 0.5,
        rotation: [0, baseRotation, 0],
      },
    }),
    []
  );

  const jump = (withDelay?: boolean) => {
    if (jumping.current) {
      return;
    }

    jumping.current = true;
    const delay = withDelay ? (delayIndex + 2) * 100 : 0;

    api.start({
      to: async (next) => {
        await new Promise((resolve) => setTimeout(resolve, delay));
        optimisticOpacity.current = getOpacity();
        setInit(true);
        await next({
          position: getPosition(0.8),
          config: {
            easing: easings.easeOutCirc,
            duration: 100,
          },
        });
        new Promise(() =>
          setTimeout(() => {
            jumping.current = false;
          }, 100)
        );
        await next({
          position: getPosition(),
          config: {
            bounce: 1.5,
            friction: 10,
            tension: 200,
          },
        });
      },
    });
  };

  useEffect(() => {
    if (hovering) {
      jump();
    }
  }, [hovering]);

  useEffect(() => {
    api.start({
      position: getPosition(),
      scale: isHome ? 1 : selected ? (exactSelected ? 2 : 0.7) : 0.5,
      config: {
        bounce: selected ? 2 : 0,
        friction: 20,
        tension: 220,
        precision: 0.0001,
      },
    });

    if (!isHome || selected) {
      optimisticOpacity.current = getOpacity();
    }
  }, [currentPath, isMobile]);

  useFrame(() => {
    if (optimisticOpacity.current === opacity || init === false) {
      return;
    }

    if (Math.abs(optimisticOpacity.current - opacity) < 0.01) {
      setOpacity(optimisticOpacity.current);
      return;
    }

    setOpacity((prev) => prev + (optimisticOpacity.current - prev) * 0.1);
  });

  useEffect(() => {
    if (isHome) {
      jump(true);
    }
  }, [isHome]);

  useEffect(() => {
    if (isHome && titleAnimating) {
      jump(true);
    }
  }, [titleAnimating]);

  useEffect(() => {
    if (selected) {
      api.start({
        rotation: [0, -2 * Math.PI + baseRotation, 0],
        loop: true,
        config: {
          duration: 60000,
        },
      });
    } else {
      api.start({
        rotation: [0, baseRotation, 0],
        config: {
          friction: 100,
        },
      });
    }
  }, [selected]);

  const handleClick = () => {
    navigate(exactSelected ? "/" : rootPath);
  };

  const handlePointerEnter = throttle(() => {
    !isMobile && jump();
  });

  return (
    <animated.group
      position={springs.position as any}
      scale={springs.scale}
      rotation={springs.rotation as any}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
    >
      <ObjectComponent opacity={opacity} selected={selected} />
    </animated.group>
  );
};

export default CanvasBaseObject;
