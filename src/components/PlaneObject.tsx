import { Euler, Vector3 } from "@react-three/fiber";
import { useEffect } from "react";
import { HOME_ITEM_ANGLE } from "../constants";
import { OptionDefinition } from "../types";
import { SpringValue, useSpring, animated, easings } from "@react-spring/three";
import { useLocation, useNavigate } from "react-router-dom";

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
  const baseYPosition = 0.25;
  const getPosition = (y?: number): Vector3 => {
    if (isHome) {
      return [-Math.cos(itemAngle), y ?? baseYPosition, Math.sin(itemAngle)];
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
        selfRotation: [0, 0, 0],
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
        selfRotation: [0, 2 * Math.PI, 0],
        loop: true,
        config: {
          duration: 30000,
        },
      });
    } else {
      api.start({
        selfRotation: [0, 0, 0],
        config: {
          friction: 100,
        },
      });
    }
  }, [selected]);

  return (
    <animated.group rotation={rotation as any}>
      <animated.mesh
        position={springs.position as any}
        scale={springs.scale}
        rotation={springs.selfRotation as any}
        onClick={handleClick}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <animated.meshBasicMaterial
          color="blue"
          opacity={springs.opacity}
          transparent
        />
      </animated.mesh>
    </animated.group>
  );
};

export default PlaneObject;
