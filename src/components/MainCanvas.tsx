import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, Euler } from "@react-three/fiber";
import { useEffect } from "react";
import styled from "styled-components";
import { HOME_ITEM_ANGLE, MENU_OPTIONS, NUM_MENU_OPTIONS } from "../constants";
import { useSpring } from "@react-spring/three";
import { useLocation } from "react-router-dom";
import PlaneObject from "./PlaneObject";
import HomePlaneGeometry from "../home/HomePlaneGeometry";

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  z-index: -1;
  top: 0;
  left: 0;
`;

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
      <HomePlaneGeometry springs={springs} />
    </StyledCanvas>
  );
};

export default MainCanvas;
