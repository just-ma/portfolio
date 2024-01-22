import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import AlmondModel from "./AlmondModel";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: black;
  border-radius: 50%;
  overflow: hidden;
`;

export default function AlmondCanvas({
  accelerate,
  dim,
  animateIntro = true,
}: {
  accelerate?: boolean;
  dim?: boolean;
  animateIntro?: boolean;
}) {
  const [rotateSpeed, setRotateSpeed] = useState(animateIntro ? 30 : 1);
  const optimisticSpeed = useRef(1);

  useEffect(() => {
    optimisticSpeed.current = accelerate ? 100 : 1;
  }, [accelerate]);

  useEffect(() => {
    const id = setInterval(() => {
      setRotateSpeed((prev) => prev + (optimisticSpeed.current - prev) * 0.1);
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [accelerate]);

  return (
    <Container>
      <Canvas>
        <AlmondModel />
        <OrbitControls
          autoRotate
          autoRotateSpeed={rotateSpeed}
          enableZoom={false}
        />
        <directionalLight position={[10, 10, 1]} intensity={dim ? 2.5 : 5} />
        <directionalLight position={[-10, -3, -2]} intensity={dim ? 0.5 : 1} />
      </Canvas>
    </Container>
  );
}
