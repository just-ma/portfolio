import { Fisheye, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, Euler } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import { OPTION_TYPES } from "../../constants";
import { useSpring, animated } from "@react-spring/three";
import { useLocation } from "react-router-dom";
import CanvasMainObject from "./CanvasMainObject";
import CanvasPlane from "./CanvasPlane";
import useIsMobile from "../../hooks/useMobile";
import CanvasAppleObject from "./CanvasAppleObject";
import {
  BackSide,
  PerspectiveCamera as PerspectiveCameraDefinition,
} from "three";
import { APPLE_MURDERER_ROOT_PATH } from "../../pages/appleMurderer/constants";

const StyledCanvas = styled(Canvas)`
  position: fixed !important;
  z-index: -1;
  bottom: 0;
  left: 0;
  width: calc(100vw + 0px) !important;
  height: calc(100vh + 100px) !important;
`;

const CanvasContent = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isDark = pathname.startsWith(APPLE_MURDERER_ROOT_PATH);

  const isMobile = useIsMobile();

  const rotationY = useRef(0);
  const cameraRef = useRef<PerspectiveCameraDefinition>(null);

  const [springs, api] = useSpring(
    {
      from: {
        position: isHome ? [-1, 6, 10] : [0, -5, 0],
        rotation: [0, 0, 0] as Euler,
        scale: 1,
        opacity: isHome ? 1 : 0,
      },
    },
    []
  );

  useEffect(() => {
    api.start({
      opacity: isHome ? 1 : 0,
      position: [0, isHome ? 0 : -1, 0],
      config: {
        bounce: isHome ? 0.5 : 0,
        friction: 100,
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
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const handleScroll = () => {
    const scrollY = Math.pow(window.scrollY, 2) / 5000;
    api.start({
      position: isHome ? undefined : [0, Math.max(-scrollY - 1, -30), 0],
      scale: Math.min(1 + scrollY, isHome ? 50 : 30),
      config: {
        friction: 50,
        tension: 200,
        precision: 0.0001,
      },
    });
  };

  return (
    <Fisheye zoom={0}>
      <OrbitControls
        maxPolarAngle={1.1}
        minPolarAngle={1.1}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={-0.5}
      />
      <PerspectiveCamera
        ref={cameraRef}
        position={[0, isMobile ? 2.5 : 3.5, 0]}
        makeDefault
      />
      <animated.group
        scale={springs.scale}
        rotation={springs.rotation as any}
        position={springs.position as any}
      >
        {OPTION_TYPES.map((type, index) => (
          <CanvasMainObject key={type} index={index} type={type} />
        ))}
        <CanvasAppleObject />
        <CanvasPlane springs={springs} />
      </animated.group>
      <ambientLight intensity={3} />
      <mesh>
        <sphereGeometry args={[15]} />
        <animated.meshPhongMaterial
          color="white"
          side={BackSide}
          visible={!isDark}
        />
      </mesh>
    </Fisheye>
  );
};

const MainCanvas = () => {
  return (
    <StyledCanvas>
      <Suspense>
        <CanvasContent />
      </Suspense>
    </StyledCanvas>
  );
};

export default MainCanvas;
