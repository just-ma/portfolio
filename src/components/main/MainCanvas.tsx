import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, Euler } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { OPTION_TYPES } from "../../constants";
import { useSpring, animated } from "@react-spring/three";
import { useLocation } from "react-router-dom";
import PlaneObject from "./objects/PlaneObject";
import HomePlaneGeometry from "../../home/HomePlaneGeometry";
import useAppContext from "../../hooks/useAppContext";

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  z-index: -1;
  top: 0;
  left: 0;
`;

const MainCanvas = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { hoveredOption } = useAppContext();

  const rotationY = useRef(0);

  const [springs, api] = useSpring(
    {
      from: {
        rotation: [0, 0, 0] as Euler,
        scale: 3,
        opacity: 0,
      },
    },
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
    rotationY.current -= Math.PI;
    api.start({
      rotation: [0, rotationY.current, 0],
      config: {
        tension: 280,
        friction: 120,
      },
    });
  }, [location.pathname]);

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
        {OPTION_TYPES.map((type, index) => (
          <PlaneObject
            key={type}
            index={index}
            type={type}
            hovering={hoveredOption === type}
          />
        ))}
        <HomePlaneGeometry springs={springs} />
      </animated.group>
      <ambientLight intensity={3} />
    </StyledCanvas>
  );
};

export default MainCanvas;
