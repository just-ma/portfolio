import { Vector3, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OPTION_TYPES, OPTION_TYPE_TO_ROOT_PATH } from "../../../constants";
import { useSpring, animated, easings } from "@react-spring/three";
import { useLocation, useNavigate } from "react-router-dom";
import LaptopModel from "./LaptopModel";
import HeadphonesModel from "./HeadphonesModel";
import PlaceholderModel from "./PlaceholderModel";
import CamcorderModel from "./CamcorderModel";
import DiaryModel from "./DiaryModel";
import { OptionType } from "../../../sanity";
import useAppContext from "../../../hooks/useAppContext";

const HOME_ITEM_ANGLE = (2 * Math.PI) / OPTION_TYPES.length;

export type ModelProps = {
  opacity: number;
  selected?: boolean;
};

const OPTION_TYPE_TO_COMPONENT: Record<
  OptionType,
  (props: ModelProps) => JSX.Element
> = {
  website: LaptopModel,
  blog: DiaryModel,
  film: CamcorderModel,
  dj: HeadphonesModel,
  about: PlaceholderModel,
};

const PlaneObject = ({
  index,
  type,
  hovering,
}: {
  index: number;
  type: OptionType;
  hovering: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const rootPath = OPTION_TYPE_TO_ROOT_PATH[type];
  const selected = currentPath.startsWith(rootPath);
  const exactSelected = currentPath === rootPath;
  const isHome = currentPath === "/";

  const ObjectComponent = OPTION_TYPE_TO_COMPONENT[type];

  const { animating } = useAppContext();

  const getOpacity = () => {
    return isHome || selected ? 1 : 0;
  };

  const optimisticOpacity = useRef(getOpacity());
  const [opacity, setOpacity] = useState(getOpacity());

  const handleClick = () => {
    navigate(exactSelected ? "/" : rootPath);
  };

  const itemAngle = (index + 1.1) * HOME_ITEM_ANGLE;
  const baseRotation = itemAngle - 0.8;
  const baseYPosition = 0.25;
  const getPosition = (y?: number): Vector3 => {
    if (isHome) {
      const multiplier = 1.2;

      return [
        -Math.cos(itemAngle) * multiplier,
        (y ?? baseYPosition) * multiplier,
        Math.sin(itemAngle) * multiplier,
      ];
    }

    return selected
      ? [0, 2.2, 0]
      : [-Math.cos(itemAngle) * 2, baseYPosition, Math.sin(itemAngle) * 2];
  };

  const [springs, api] = useSpring(
    () => ({
      from: {
        position: getPosition(),
        scale: 0.5,
        rotation: [0, baseRotation, 0],
      },
    }),
    []
  );

  const jump = (withDelay?: boolean) => {
    const delay = withDelay ? (index + 2) * 100 : 0;

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
      scale: isHome ? 1 : selected ? 0.7 : 0.5,
      config: {
        bounce: selected ? 2 : 0,
        friction: 20,
        tension: 220,
      },
    });

    optimisticOpacity.current = getOpacity();
  }, [currentPath]);

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
    if (isHome && animating) {
      jump(true);
    }
  }, [animating, isHome]);

  useEffect(() => {
    if (isHome && animating) {
      jump(true);
    }
  }, [animating, isHome]);

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

  return (
    <animated.group
      position={springs.position as any}
      scale={springs.scale}
      rotation={springs.rotation as any}
      onClick={handleClick}
    >
      <ObjectComponent opacity={opacity} selected={selected} />
    </animated.group>
  );
};

export default PlaneObject;
