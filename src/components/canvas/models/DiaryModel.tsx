import DiaryGLTF from "../../../assets/models/diary/Diary.glb";
import { SpringValue, animated, useSpring } from "@react-spring/three";
import useModelLoader from "./useModelLoader";
import { ModelProps } from "../CanvasBaseObject";

const DiaryModel = ({
  selected,
  opacity,
  onPointerEnter,
  onPointerLeave,
}: ModelProps) => {
  const object = useModelLoader(DiaryGLTF, opacity);

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
      onPointerLeave={onPointerLeave}
    >
      <mesh position={[0.16, 0, -0.085]}>
        <boxGeometry args={[0.13, 0.1, 0.19]} />
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

export default DiaryModel;
