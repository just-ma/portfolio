import { Euler, Vector3 } from "@react-three/fiber";
import { useEffect } from "react";
import { HOME_ITEM_ANGLE } from "../../../constants";
import { OptionDefinition } from "../../../types";
import { SpringValue, useSpring, animated, easings } from "@react-spring/three";
import { useLocation, useNavigate } from "react-router-dom";
import LaptopModel from "./LaptopModel";
import HeadphonesModel from "./HeadphonesModel";
import PlaceholderModel from "./PlaceholderModel";
import CamcorderModel from "./CamcorderModel";
import DiaryModel from "./DiaryModel";

export type ModelProps = {
  opacity: SpringValue<number>;
  selected?: boolean;
};

const OPTION_TYPE_TO_COMPONENT: Record<
  OptionDefinition["type"],
  (props: ModelProps) => JSX.Element
> = {
  website: LaptopModel,
  blog: DiaryModel,
  film: CamcorderModel,
  dj: HeadphonesModel,
  about: PlaceholderModel,
};

const PlaneObject = ({
  rotation,
  index,
  option,
  active,
  hovering,
}: {
  rotation: SpringValue<Euler>;
  index: number;
  option: OptionDefinition;
  active: boolean;
  hovering: boolean;
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const selected = currentPath.startsWith(option.path);
  const exactSelected = currentPath === option.path;
  const isHome = currentPath === "/";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(exactSelected ? "/" : option.path);
  };

  const itemAngle = (index + 1.1) * HOME_ITEM_ANGLE;
  const baseSelfRotation = itemAngle - 0.8;
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
      ? [0, 2.9, 0]
      : [-Math.cos(itemAngle) * 2, baseYPosition, Math.sin(itemAngle) * 2];
  };

  const [springs, api] = useSpring(
    () => ({
      from: {
        position: getPosition(),
        opacity: isHome || selected ? 1 : 0,
        scale: 0.5,
        selfRotation: [0, baseSelfRotation, 0],
      },
    }),
    []
  );

  const jump = (delay?: number) => {
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
    const intervalId =
      hovering && active
        ? setInterval(() => {
            jump();
          }, 3000)
        : undefined;

    return () => {
      clearInterval(intervalId);
    };
  }, [hovering, active]);

  useEffect(() => {
    if (active) {
      jump(hovering ? 0 : 100);
    }
  }, [active]);

  useEffect(() => {
    api.start({
      position: getPosition(),
      opacity: isHome || selected ? 1 : 0,
      scale: isHome ? 1 : selected ? 0.7 : 0.5,
      config: {
        bounce: selected ? 2 : 0,
        friction: 20,
        tension: 220,
      },
    });
    isHome && jump((index + 2) * 100);
  }, [currentPath]);

  useEffect(() => {
    if (selected) {
      api.start({
        selfRotation: [0, 2 * Math.PI + baseSelfRotation, 0],
        loop: true,
        config: {
          duration: 30000,
        },
      });
    } else {
      api.start({
        selfRotation: [0, baseSelfRotation, 0],
        config: {
          friction: 100,
        },
      });
    }
  }, [selected]);

  const ObjectComponent = OPTION_TYPE_TO_COMPONENT[option.type];

  return (
    <animated.group rotation={rotation as any}>
      <animated.group
        position={springs.position as any}
        scale={springs.scale}
        rotation={springs.selfRotation as any}
        onClick={handleClick}
      >
        <ObjectComponent opacity={springs.opacity} selected={selected} />
      </animated.group>
    </animated.group>
  );
};

export default PlaneObject;
