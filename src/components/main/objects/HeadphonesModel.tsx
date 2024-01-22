import { ObjectMap, useLoader } from "@react-three/fiber";
import LaptopGLTF from "../../../assets/models/headphones/Headphones.glb";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelProps } from "./PlaneObject";

const HeadphonesModel = ({ selected }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, LaptopGLTF) as GLTF & ObjectMap;

  return (
    <group scale={3} position={[-0.27, -0.47, -0.32]}>
      <primitive object={gltf.scene} rotation={[0, 1, 0]} />
    </group>
  );
};

export default HeadphonesModel;
