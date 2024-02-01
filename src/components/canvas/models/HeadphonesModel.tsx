import HeadphonesGLTF from "../../../assets/models/headphones/Headphones.glb";
import { ModelProps } from "../CanvasObject";
import { SpringValue, animated, useSpring } from "@react-spring/three";
import useModelLoader from "./useModelLoader";

const HeadphonesModel = ({ selected, opacity }: ModelProps) => {
  const object = useModelLoader(HeadphonesGLTF, opacity);

  const [springs] = useSpring(
    {
      scale: selected ? 3 : 3.6,
      position: selected ? [-0.27, -0.5, -0.32] : [-0.3, -0.42, 0.65],
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
        <primitive object={object} />
      </animated.group>
    </animated.group>
  );
};

export default HeadphonesModel;
