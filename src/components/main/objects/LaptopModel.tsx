import { ObjectMap, useLoader } from "@react-three/fiber";
import LaptopGLTF from "../../../assets/models/laptop/Laptop.glb 2";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const LaptopModel = () => {
  const gltf = useLoader(GLTFLoader, LaptopGLTF) as GLTF & ObjectMap;

  return <primitive object={gltf.scene} scale={3} position={[0, -0.3, -0.4]} />;
};

export default LaptopModel;
