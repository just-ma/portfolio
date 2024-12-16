import { animated, SpringValue } from "@react-spring/three";
import OutlineTexture from "../../assets/images/canvasPlaneOutline.svg";
import { useTexture } from "@react-three/drei";

const CanvasPlane = ({
  scale,
  opacity,
}: {
  scale: SpringValue<number>;
  opacity: SpringValue<number>;
}) => {
  const texture = useTexture<string>(OutlineTexture);

  return (
    <animated.mesh rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
      <planeGeometry args={[4, 4, 8, 8]} />
      <animated.meshBasicMaterial opacity={opacity} transparent map={texture} />
    </animated.mesh>
  );
};

export default CanvasPlane;
