import { useSpring, animated, SpringValue } from "@react-spring/three";
import CamcorderGLTF from "../../../assets/models/camcorder/Camcorder.glb";
import useModelLoader from "./useModelLoader";
import { ModelProps } from "../CanvasBaseObject";

const CamcorderModel = ({
  selected,
  opacity,
  onPointerEnter,
  onPointerLeave,
}: ModelProps) => {
  const object = useModelLoader(CamcorderGLTF, opacity);

  const [springs] = useSpring(
    {
      position: selected ? [-0.12, -0.25, -0.05] : [-0.12, -0.27, -0.05],
    },
    [selected]
  );

  return (
    <animated.group
      scale={3.5}
      position={springs.position as SpringValue}
      onPointerLeave={onPointerLeave}
    >
      <mesh position={[0.05, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.13]} />
        <meshPhongMaterial color="black" visible={false} />
      </mesh>
      <mesh onPointerEnter={onPointerEnter}>
        <primitive object={object} rotation={[0, 0.7, 0]} />
      </mesh>
    </animated.group>
  );
};

export default CamcorderModel;
