import CamcorderGLTF from "../../../assets/models/camcorder/Camcorder.glb";
import { ModelProps } from "./PlaneObject";
import useModelLoader from "./useModelLoader";

const CamcorderModel = ({ opacity }: ModelProps) => {
  const object = useModelLoader(CamcorderGLTF, opacity);

  return (
    <group scale={3.5} position={[-0.12, -0.27, -0.05]}>
      <primitive object={object} rotation={[0, 0.7, 0]} />
    </group>
  );
};

export default CamcorderModel;
