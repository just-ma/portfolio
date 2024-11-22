import { Vector3, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated, easings } from "@react-spring/three";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useMobile";

export type ModelProps = {
  opacity: number;
  selected?: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

const CanvasBaseObject = ({
  hovering,
  angle,
  distance,
  delayIndex,
  ObjectComponent,
  rootPath,
  titleAnimating,
  onMouseEnter,
  onMouseLeave,
}: {
  hovering?: boolean;
  angle: number;
  distance: number;
  delayIndex: number;
  ObjectComponent: (props: ModelProps) => JSX.Element;
  rootPath: string;
  titleAnimating: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const selected = currentPath.startsWith(rootPath);
  const exactSelected = currentPath === rootPath;
  const isHome = currentPath === "/";
  const hidden = !isHome && !exactSelected;

  const optimisticOpacity = useRef(hidden ? 0 : 1);
  const jumping = useRef(false);
  const transitioning = useRef(false);
  const [opacity, setOpacity] = useState(0);

  const isMobile = useIsMobile();

  const baseRotation = angle - 0.8;
  const baseYPosition = 0.25;

  const getPosition = (y?: number): Vector3 => {
    if (selected) {
      return [0, 2.3 + (isMobile ? -0.1 : 0), 0];
    }

    return [
      -Math.cos(angle) * distance,
      (y ?? baseYPosition) * 1.2,
      Math.sin(angle) * distance,
    ];
  };

  const [springs, api] = useSpring(
    () => ({
      from: {
        scale: 1,
        position: getPosition(),
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

  const hover = () => {
    if (transitioning.current || jumping.current) {
      return;
    }

    api.start({
      position: getPosition(0.35),
      config: {
        easing: easings.easeOutCirc,
        duration: 200,
      },
    });
  };

  const drop = () => {
    if (transitioning.current || jumping.current) {
      return;
    }

    api.start({
      position: getPosition(),
      config: {
        bounce: 1.5,
        friction: 10,
        tension: 200,
        precision: 0.0001,
      },
    });
  };

  useEffect(() => {
    if (hovering) {
      hover();
    } else {
      drop();
    }
  }, [hovering]);

  useEffect(() => {
    transitioning.current = true;
    api.start({
      position: getPosition(),
      scale: exactSelected ? 3 : isHome ? 1 : 2,
      config: {
        bounce: 1.5,
        friction: 50,
        tension: 220,
        precision: 0.0001,
      },
    });
    setTimeout(() => {
      transitioning.current = false;
    }, 1000);

    optimisticOpacity.current = hidden ? 0 : 1;
  }, [currentPath, isMobile]);

  useFrame(() => {
    if (optimisticOpacity.current === opacity) {
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

  const unClickable = hidden || window.scrollY > 200;
  const handleClick = () => {
    if (unClickable) {
      return;
    }

    navigate(exactSelected ? "/" : rootPath);
  };

  const handlePointerEnter = () => {
    if (isMobile || unClickable) {
      return;
    }

    document.body.style.cursor = "pointer";
    onMouseEnter();

    if (isHome) {
      hover();
    }
  };

  const handlePointerLeave = () => {
    if (isMobile || unClickable) {
      return;
    }

    document.body.style.cursor = "default";
    onMouseLeave();

    if (isHome) {
      drop();
    }
  };

  return (
    <animated.group
      position={springs.position as any}
      scale={springs.scale}
      rotation={springs.rotation as any}
      onClick={handleClick}
    >
      <ObjectComponent
        opacity={opacity}
        selected={selected}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
    </animated.group>
  );
};

export default CanvasBaseObject;
