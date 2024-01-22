import { ObjectMap, useLoader } from "@react-three/fiber";
import LaptopGLTF from "../../../assets/models/laptop/Laptop.glb";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelProps } from "./PlaneObject";
import { useSpring, animated, SpringValue } from "@react-spring/three";
import { useEffect } from "react";

const LaptopModel = ({ selected }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, LaptopGLTF) as GLTF & ObjectMap;

  const [springs] = useSpring(
    {
      scale: selected ? 2.5 : 3.4,
      position: selected ? [0.0, -0.33, -0.5] : [0.04, -0.38, -0.55],
    },
    [selected]
  );

  useEffect(() => {}, []);

  // gltf.materials[""].opacity = 0.5;
  // gltf.materials[""].transparent = true;

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position as SpringValue}
      rotation={[0, 0.05, 0]}
    >
      <primitive object={gltf.scene} />
    </animated.group>
  );
};

export default LaptopModel;
