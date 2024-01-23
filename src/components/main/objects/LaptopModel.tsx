import LaptopGLTF from "../../../assets/models/laptop/Laptop.glb";
import { ModelProps } from "./PlaneObject";
import { useSpring, animated, SpringValue } from "@react-spring/three";
import useModelLoader from "./useModelLoader";

const LaptopModel = ({ selected, opacity }: ModelProps) => {
  const object = useModelLoader(LaptopGLTF, opacity);

  const [springs] = useSpring(
    {
      scale: selected ? 2.5 : 3.4,
      position: selected ? [0.0, -0.28, -0.5] : [0.04, -0.38, -0.55],
    },
    [selected]
  );

  return (
    <animated.group
      scale={springs.scale}
      position={springs.position as SpringValue}
      rotation={[0, 0.05, 0]}
    >
      <primitive object={object} />
    </animated.group>
  );
};

export default LaptopModel;
