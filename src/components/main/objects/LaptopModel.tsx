import { ObjectMap, useLoader } from "@react-three/fiber";
import LaptopGLTF from "../../../assets/models/laptop/Laptop.glb";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelProps } from "./PlaneObject";

const LaptopModel = ({ selected }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, LaptopGLTF) as GLTF & ObjectMap;

  gltf.materials[""].opacity = 0.5;
  gltf.materials[""].transparent = true;
  // gltf.materials[""];

  return (
    <primitive
      object={gltf.scene}
      scale={3}
      position={[0.04, -0.36, -0.55]}
      rotation={[0, 0.05, 0]}
    />
  );
};

export default LaptopModel;
