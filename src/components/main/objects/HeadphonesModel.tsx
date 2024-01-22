import { ObjectMap, useLoader } from "@react-three/fiber";
import LaptopGLTF from "../../../assets/models/headphones/Headphones.glb";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelProps } from "./PlaneObject";
import { SpringValue, animated, useSpring } from "@react-spring/three";

const HeadphonesModel = ({ selected }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, LaptopGLTF) as GLTF & ObjectMap;

  const [springs] = useSpring(
    {
      scale: selected ? 3 : 3.6,
      position: selected ? [-0.27, -0.47, -0.32] : [-0.3, -0.42, 0.65],
      rotation: selected ? [0, 1, 0] : [-1.7, 1, 0],
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

export default HeadphonesModel;
