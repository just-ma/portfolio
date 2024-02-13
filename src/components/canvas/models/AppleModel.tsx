import AppleGLTF from "../../../assets/models/apple/Apple.glb";
import { ModelProps } from "../CanvasMainObject";
import useModelLoader from "./useModelLoader";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const AppleModel = ({ opacity: _opacity }: ModelProps) => {
  const { pathname } = useLocation();

  const optimisticOpacity = useRef(0);
  const [opacity, setOpacity] = useState(0);
  const object = useModelLoader(AppleGLTF, Math.min(opacity, _opacity));

  useEffect(() => {
    optimisticOpacity.current = pathname === "/" ? 1 : 0;
  }, [pathname]);

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

  return (
    <group scale={4} position={[0, -0.27, 0]}>
      <primitive object={object} rotation={[0, 0.7, 0]} />
    </group>
  );
};

export default AppleModel;
