import { Euler } from "@react-three/fiber";
import { animated, SpringValue } from "@react-spring/three";
import OutlineTexture from "./outline.svg";
// import OutlineTexture from "./yar.png";

import { useTexture } from "@react-three/drei";

const HomePlaneGeometry = ({
  springs,
}: {
  springs: {
    rotation: SpringValue<Euler>;
    scale: SpringValue<number>;
    opacity: SpringValue<number>;
  };
}) => {
  const texutre = useTexture<string>(OutlineTexture);

  return (
    <animated.group rotation={springs.rotation as any} scale={springs.scale}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4, 8, 8]} />
        <animated.meshBasicMaterial
          opacity={springs.opacity}
          transparent
          map={texutre}
        />
      </mesh>
    </animated.group>
  );
};

export default HomePlaneGeometry;
