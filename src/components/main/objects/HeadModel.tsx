import HeadGLTF from "../../../assets/models/head/Head.glb";
import { ModelProps } from "./PlaneObject";
import { SpringValue, animated, useSpring } from "@react-spring/three";
import useModelLoader from "./useModelLoader";

const HeadModel = ({ selected, opacity }: ModelProps) => {
  const object = useModelLoader(HeadGLTF, opacity);

  const [springs] = useSpring(
    {
      scale: selected ? 2.3 : 3,
      position: selected ? [-0.05, -1.32, 0.1] : [-0.1, -0.23, 1.6],
      rotation: selected ? [0, 0, 0] : [-1.4, -2, 0.1],
    },
    [selected]
  );

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position as SpringValue}
      rotation={springs.rotation as any}
    >
      <primitive object={object} />
    </animated.group>
  );
};

export default HeadModel;
