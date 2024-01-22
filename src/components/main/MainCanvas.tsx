import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, Euler } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { MENU_OPTIONS } from "../../constants";
import { useSpring, animated } from "@react-spring/three";
import { useLocation } from "react-router-dom";
import PlaneObject from "./objects/PlaneObject";
import HomePlaneGeometry from "../../home/HomePlaneGeometry";

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

  const rotationY = useRef(0);

  const [springs, api] = useSpring(
    {
      from: {
        rotation: [0, 0, 0] as Euler,
        scale: isHome ? 1 : 3,
        opacity: isHome ? 1 : 0,
      },
    },
    []
  );

  useEffect(() => {
    rotationY.current -= Math.PI;
    api.start({
      rotation: [0, rotationY.current, 0],
      config: {
        tension: 280,
        friction: 120,
      },
    });

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

  return (
    <StyledCanvas>
      <PerspectiveCamera position={[0, 3, 6]} makeDefault />
      <OrbitControls
        maxPolarAngle={1.1}
        minPolarAngle={1.1}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={-0.5}
      />
      <animated.group rotation={springs.rotation as any}>
        {MENU_OPTIONS.map((option, index) => (
          <PlaneObject
            key={option.path}
            index={index}
            option={option}
            active={index === activeIndex}
            hovering={hovering}
          />
        ))}
        <HomePlaneGeometry springs={springs} />
      </animated.group>
      <ambientLight intensity={3} />
    </StyledCanvas>
  );
};

export default MainCanvas;
