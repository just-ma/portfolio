import { Fisheye, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, Euler } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import { MEDIA_SIZE, OPTION_TYPES } from "../../constants";
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
import useMobileCanvasScroll from "./useMobileCanvasScroll";

const DESKTOP_HEIGHT_OFFSET_PX = 100;
const MOBILE_HEIGHT_OFFSET_PX = 200;

const StyledCanvas = styled(Canvas)`
  position: fixed !important;
  z-index: -1;
  left: 0;
  width: calc(100vw + 0px) !important;

  @media ${MEDIA_SIZE.desktop} {
    top: -${DESKTOP_HEIGHT_OFFSET_PX}px;
    height: calc(100vh + ${DESKTOP_HEIGHT_OFFSET_PX}px) !important;
  }

  @media ${MEDIA_SIZE.mobile} {
    top: -${MOBILE_HEIGHT_OFFSET_PX}px;
    height: calc(100lvh + ${MOBILE_HEIGHT_OFFSET_PX}px) !important;
  }
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
        planeScale: 1,
        opacity: isHome ? 1 : 0,
      },
    },
    []
  );

  useEffect(() => {
    api.start({
      opacity: isHome ? 1 : 0,
      planeScale: isHome ? 1 : 0.2,
      position: [0, 0, 0],
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
  }, [isHome, isMobile]);

  const handleScroll = () => {
    const scrollY = Math.pow(window.scrollY, 2) / 5000;
    const positionY = Math.min(scrollY, 10);
    const desktopScale = Math.min(
      1 + scrollY * (isHome ? 0.5 : 5),
      isHome ? 50 : 10
    );

    api.start({
      position: isHome ? undefined : [0, positionY, 0],
      scale: isMobile && !isHome ? 1 : desktopScale,
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
        <CanvasPlane scale={springs.planeScale} opacity={springs.opacity} />
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

const T = styled.div`
  position: fixed;
  z-index: 99999;
  top: 50px;
  left: 50px;
  font-size: 20px;
`;

const MainCanvas = () => {
  const { t, onPointerMove, onPointerDown, onPointerUp } =
    useMobileCanvasScroll();

  return (
    <>
      <T>{t}</T>
      <StyledCanvas
        onPointerDown={onPointerDown as any}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove as any}
      >
        <Suspense>
          <CanvasContent />
        </Suspense>
      </StyledCanvas>
    </>
  );
};

export default MainCanvas;
