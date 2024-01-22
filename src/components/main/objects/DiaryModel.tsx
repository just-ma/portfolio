import { ObjectMap, useLoader } from "@react-three/fiber";
import DiaryGLTF from "../../../assets/models/diary/Diary.glb";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelProps } from "./PlaneObject";
import { SpringValue, animated, useSpring } from "@react-spring/three";

const DiaryModel = ({ selected }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, DiaryGLTF) as GLTF & ObjectMap;

  const [springs] = useSpring(
    {
      scale: selected ? 3 : 3.5,
      position: selected ? [-0.5, -0.25, -0.01] : [-0.6, -0.24, 0.3],
      rotation: selected ? [0, 0.7, -0.05] : [-1.55, 0.55, -0.05],
    },
    [selected]
  );

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position as SpringValue}
    >
      <animated.group rotation={springs.rotation as any}>
        <primitive object={gltf.scene} />
      </animated.group>
    </animated.group>
  );
};

export default DiaryModel;
