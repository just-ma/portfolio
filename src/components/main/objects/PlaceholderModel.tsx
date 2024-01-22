import { animated } from "@react-spring/three";
import { ModelProps } from "./PlaneObject";

const PlaceholderModel = ({ opacity }: ModelProps) => {
  return (
    <mesh castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <animated.meshBasicMaterial color="blue" opacity={opacity} transparent />
    </mesh>
  );
};

export default PlaceholderModel;
