import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, Euler, Vector3 } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  HOME_ITEM_ANGLE,
  HOME_ROTATION_DURATION,
  MENU_OPTIONS,
  NUM_MENU_OPTIONS,
} from "../constants";
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

  const itemAngle = (index + 1.1) * HOME_ITEM_ANGLE;
  const baseYPosition = 0.25;
  const getPosition = (y?: number): Vector3 => {
    return [
      selected ? 0 : -Math.cos(itemAngle),
      y ?? (currentPath === "/" ? baseYPosition : selected ? -2.5 : -5),
      selected ? 0 : Math.sin(itemAngle),
    ];
  };

  const [springs, api] = useSpring(() => ({
    position: getPosition(),
    opacity: currentPath === "/" || selected ? 1 : 0,
    config: (key) => {
      switch (key) {
        case "position":
          return {
            bounce: 1,
            friction: 10,
            mass: 1,
            tension: 200,
          };
        case "opacity":
          return {};
        default:
          return {};
      }
    },
  }));

  useEffect(() => {
    api.start({
      position: getPosition(),
      opacity: currentPath === "/" || selected ? 1 : 0,
    });
  }, [currentPath]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (active || hovering) {
      api.start({ position: getPosition(2) });

      timeoutId = setTimeout(() => {
        api.start({
          position: getPosition(),
        });
      }, 30);
    }

    return () => {
      clearTimeout(timeoutId);
      api.start({
        position: getPosition(),
      });
    };
  }, [active, hovering]);

  console.log({ rotation });

  return (
    <animated.group rotation={rotation as any}>
      <animated.mesh position={springs.position as any}>
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

const MainCanvas = ({ hoveredOption }: { hoveredOption: string | null }) => {
  const activeItemIndex = useRef(0);
  const hoveredOptionRef = useRef(hoveredOption);

  const [activeIndex, setActiveIndex] = useState(0);

  const location = useLocation();
  const currentPath = location.pathname;
  const isHome = currentPath === "/";

  const [springs, api] = useSpring(() => ({
    rotation: [0, 0, 0] as Euler,
    position: [0, 0, 0],
    opacity: isHome ? 1 : 0,
    config: (key) => {
      switch (key) {
        case "rotation":
          return {
            easing: easings.easeInOutExpo,
            tension: 150,
            mass: 15,
            friction: 50,
          };
        case "position":
          return {
            bounce: 1,
            friction: 10,
            mass: 1,
            tension: 200,
          };
        case "opacity":
          return {};
        default:
          return {};
      }
    },
  }));

  useEffect(() => {
    api.start({
      position: [0, isHome ? 0 : -5, 0],
      rotation: [
        0,
        isHome ? Math.PI : -activeItemIndex.current * HOME_ITEM_ANGLE,
        0,
      ],
      opacity: isHome ? 1 : 0,
    });
  }, [isHome]);

  useEffect(() => {
    hoveredOptionRef.current = hoveredOption;
    if (hoveredOptionRef.current !== null) {
      const index = MENU_OPTIONS.findIndex(
        (option) => option.path === hoveredOption
      );
      activeItemIndex.current = index;
      setActiveIndex(activeItemIndex.current);

      api.start({
        rotation: [0, -activeItemIndex.current * HOME_ITEM_ANGLE, 0],
      });
    }
  }, [hoveredOption]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isHome) {
      intervalId = setInterval(() => {
        if (hoveredOptionRef.current !== null) {
          return;
        }

        activeItemIndex.current =
          (activeItemIndex.current + 1) % NUM_MENU_OPTIONS;
        setActiveIndex(activeItemIndex.current);

        if (activeItemIndex.current === 0) {
          api.start({
            rotation: [0, HOME_ITEM_ANGLE, 0],
            immediate: true,
          });
        }

        api.start({
          rotation: [0, -activeItemIndex.current * HOME_ITEM_ANGLE, 0],
        });
      }, HOME_ROTATION_DURATION);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isHome]);

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
          hovering={hoveredOption === option.path}
        />
      ))}
      <animated.group
        rotation={springs.rotation as any}
        position={springs.position as any}
      >
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
