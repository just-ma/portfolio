import HeadGLTF from "../../../assets/models/head/Head.glb";
import { SpringValue, animated, useSpring } from "@react-spring/three";
import useModelLoader from "./useModelLoader";
import { ModelProps } from "../CanvasBaseObject";

const HeadModel = ({
  selected,
  opacity,
  onPointerEnter,
  onPointerLeave,
}: ModelProps) => {
  const object = useModelLoader(HeadGLTF, opacity);

  const [springs] = useSpring(
    {
      scale: selected ? 2.3 : 3,
      position: selected ? [-0.05, -1.32, 0.1] : [-0.1, -0.23, 1.6],
      rotation: selected ? [0, 0, 0] : [-1.4, -2, 0.1],
    },
    [selected]
  );

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position as SpringValue}
      rotation={springs.rotation as any}
      onPointerLeave={onPointerLeave}
    >
      <mesh position={[-0.05, 0.52, -0.02]}>
        <sphereGeometry args={[0.1]} />
        <meshPhongMaterial color="black" visible={false} />
      </mesh>
      <mesh position={[-0.05, 0.62, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshPhongMaterial color="black" visible={false} />
      </mesh>
      <mesh onPointerEnter={onPointerEnter}>
        <primitive object={object} />
      </mesh>
    </animated.group>
  );
};

export default HeadModel;
