import { useSpring, animated, SpringValue } from "@react-spring/three";
import CamcorderGLTF from "../../../assets/models/camcorder/Camcorder.glb";
import { ModelProps } from "../CanvasMainObject";
import useModelLoader from "./useModelLoader";

const CamcorderModel = ({ selected, opacity }: ModelProps) => {
  const object = useModelLoader(CamcorderGLTF, opacity);

  const [springs] = useSpring(
    {
      position: selected ? [-0.12, -0.25, -0.05] : [-0.12, -0.27, -0.05],
    },
    [selected]
  );

  return (
    <animated.group scale={3.5} position={springs.position as SpringValue}>
      <primitive object={object} rotation={[0, 0.7, 0]} />
    </animated.group>
  );
};

export default CamcorderModel;
