import { animated, SpringValue } from "@react-spring/three";
import OutlineTexture from "../../assets/images/canvasPlaneOutline.svg";
import { useTexture } from "@react-three/drei";

const CanvasPlane = ({
  springs,
}: {
  springs: {
    opacity: SpringValue<number>;
  };
}) => {
  const texture = useTexture<string>(OutlineTexture);

  return (
    <animated.group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4, 8, 8]} />
        <animated.meshBasicMaterial
          opacity={springs.opacity}
          transparent
          map={texture}
        />
      </mesh>
    </animated.group>
  );
};

export default CanvasPlane;
