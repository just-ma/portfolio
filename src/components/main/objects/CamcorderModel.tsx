import { ObjectMap, useLoader } from "@react-three/fiber";
import CamcorderGLTF from "../../../assets/models/camcorder/Camcorder.glb";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelProps } from "./PlaneObject";

const CamcorderModel = ({ selected }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, CamcorderGLTF) as GLTF & ObjectMap;

  return (
    <group scale={3.5} position={[-0.12, -0.27, -0.05]}>
      <primitive object={gltf.scene} rotation={[0, 0.7, 0]} />
    </group>
  );
};

export default CamcorderModel;
