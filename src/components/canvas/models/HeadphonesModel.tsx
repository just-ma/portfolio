import HeadphonesGLTF from "../../../assets/models/headphones/Headphones.glb";
import { SpringValue, animated, useSpring } from "@react-spring/three";
import useModelLoader from "./useModelLoader";
import { ModelProps } from "../CanvasBaseObject";

const HeadphonesModel = ({
  selected,
  opacity,
  onPointerEnter,
  onPointerLeave,
}: ModelProps) => {
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
      onPointerLeave={onPointerLeave}
    >
      <mesh position={[0.09, 0.07, -0.18]}>
        <cylinderGeometry args={[0.085, 0.085, 0.09]} />
        <meshPhongMaterial color="black" visible={false} />
      </mesh>
      <animated.group
        rotation={springs.rotation as any}
        onPointerEnter={onPointerEnter}
      >
        <primitive object={object} />
      </animated.group>
    </animated.group>
  );
};

export default HeadphonesModel;
