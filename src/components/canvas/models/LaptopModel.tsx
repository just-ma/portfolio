import LaptopGLTF from "../../../assets/models/laptop/Laptop.glb";
import { useSpring, animated, SpringValue } from "@react-spring/three";
import useModelLoader from "./useModelLoader";
import { ModelProps } from "../CanvasBaseObject";

const LaptopModel = ({
  selected,
  opacity,
  onPointerEnter,
  onPointerLeave,
}: ModelProps) => {
  const object = useModelLoader(LaptopGLTF, opacity);

  const [springs] = useSpring(
    {
      scale: selected ? 2.5 : 3.4,
      position: selected ? [0.0, -0.28, -0.5] : [0.04, -0.38, -0.55],
    },
    [selected]
  );

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position as SpringValue}
      rotation={[0, 0.05, 0]}
      onPointerLeave={onPointerLeave}
    >
      <mesh position={[-0.02, 0, 0.23]}>
        <boxGeometry args={[0.28, 0.1, 0.23]} />
        <meshPhongMaterial color="black" visible={false} />
      </mesh>
      <mesh position={[-0.01, 0.12, 0.1]} rotation={[1, 0, 0]}>
        <boxGeometry args={[0.28, 0.03, 0.23]} />
        <meshPhongMaterial color="black" visible={false} />
      </mesh>
      <mesh onPointerEnter={onPointerEnter}>
        <primitive object={object} />
      </mesh>
    </animated.group>
  );
};

export default LaptopModel;
