import { ObjectMap, useLoader } from "@react-three/fiber";
import DiaryGLTF from "../../../assets/models/diary/Diary.glb";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelProps } from "./PlaneObject";

const DiaryModel = ({ selected }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, DiaryGLTF) as GLTF & ObjectMap;

  return (
    <group scale={3} position={[-0.5, -0.25, -0.01]}>
      <primitive object={gltf.scene} rotation={[0, 0.7, -0.05]} />
    </group>
  );
};

export default DiaryModel;
