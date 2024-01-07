import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, Euler, Vector3 } from "@react-three/fiber";
import { useEffect } from "react";
import styled from "styled-components";
import { HOME_ITEM_ANGLE, MENU_OPTIONS, NUM_MENU_OPTIONS } from "../constants";
import { OptionDefinition } from "../types";
import { SpringValue, useSpring, animated, easings } from "@react-spring/three";
import { useLocation } from "react-router-dom";

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  z-index: -1;
  top: 0;
  left: 0;
`;

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
  const selected = currentPath === option.path;
  const isHome = currentPath === "/";

  const itemAngle = (index + 1.1) * HOME_ITEM_ANGLE;
  const baseYPosition = 0.25;
  const getPosition = (y?: number): Vector3 => {
    if (isHome) {
      return [-Math.cos(itemAngle), y ?? baseYPosition, Math.sin(itemAngle)];
    }

    return selected
      ? [0, -2.5, 0]
      : [-Math.cos(itemAngle) * 2, baseYPosition, Math.sin(itemAngle) * 2];
  };

  const [springs, api] = useSpring(
    () => ({
      from: {
        position: getPosition(),
        opacity: isHome || selected ? 1 : 0,
        scale: isHome || selected ? 1 : 0.5,
        selfRotation: [0, 0, 0],
      },
    }),
    []
  );

  useEffect(() => {
    if (active) {
      api.start({
        to: async (next) => {
          await new Promise((resolve) =>
            setTimeout(resolve, hovering ? 0 : 100)
          );
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
    }
  }, [active]);

  useEffect(() => {
    api.start({
      position: getPosition(),
      opacity: isHome || selected ? 1 : 0,
      scale: isHome || selected ? 1 : 0.5,
      config: {
        bounce: isHome ? 1 : selected ? 2 : 0,
        friction: 20,
        tension: 220,
      },
    });
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

const MainCanvas = ({
  activeIndex,
  setActiveIndex,
  hovering,
}: {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  hovering: boolean;
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isHome = currentPath === "/";

  const [springs, api] = useSpring(
    () => ({
      from: {
        rotation: [0, 0, 0] as Euler,
        scale: isHome ? 1 : 3,
        opacity: isHome ? 1 : 0,
      },
      config: (key) => {
        switch (key) {
          case "rotation": {
            return {
              tension: 280,
              friction: 120,
            };
          }
          default:
            return {};
        }
      },
    }),
    []
  );

  useEffect(() => {
    api.start({
      scale: isHome ? 1 : 2,
      opacity: isHome ? 1 : 0,
      config: {
        bounce: isHome ? 0.5 : 0,
        friction: 20,
        tension: 220,
      },
    });
  }, [isHome]);

  useEffect(() => {
    if (isHome) {
      api.start({
        to: async (next) => {
          await next({
            rotation: [0, activeIndex * -HOME_ITEM_ANGLE, 0],
          });

          if (activeIndex === NUM_MENU_OPTIONS - 1) {
            await next({
              rotation: [0, HOME_ITEM_ANGLE, 0],
              immediate: true,
            });
          }

          if (!hovering) {
            setActiveIndex((prev) => (prev + 1) % NUM_MENU_OPTIONS);
          }
        },
      });
    } else {
      api.start({
        rotation: [
          0,
          (activeIndex - NUM_MENU_OPTIONS / 2) * -HOME_ITEM_ANGLE,
          0,
        ],
      });
    }
  }, [activeIndex, hovering, isHome]);

  return (
    <StyledCanvas>
      <PerspectiveCamera
        position={[0, 3, 6]}
        rotation={[-0.4, 0, 0]}
        makeDefault
      />
      {MENU_OPTIONS.map((option, index) => (
        <PlaneObject
          key={option.path}
          index={index}
          rotation={springs.rotation}
          option={option}
          active={index === activeIndex}
          hovering={hovering}
        />
      ))}
      <animated.group rotation={springs.rotation as any} scale={springs.scale}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 4, 8, 8]} />
          <animated.meshNormalMaterial
            wireframe
            opacity={springs.opacity}
            transparent
          />
        </mesh>
      </animated.group>
    </StyledCanvas>
  );
};

export default MainCanvas;
