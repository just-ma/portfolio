import { animated, SpringValue } from "@react-spring/three";
import OutlineTexture from "../../assets/images/canvasPlaneOutline.svg";

import { useTexture } from "@react-three/drei";
import useIsMobile from "../../hooks/useMobile";
import { throttle } from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import { DoubleSide } from "three";

const CanvasPlane = ({
  springs,
}: {
  springs: {
    opacity: SpringValue<number>;
  };
}) => {
  const isMobile = useIsMobile();

  const { onHoveredItemChange } = useAppContext();

  const texture = useTexture<string>(OutlineTexture);

  const handlePointerEnter = throttle(() => {
    if (isMobile) {
      return;
    }

    document.body.style.cursor = "pointer";
    onHoveredItemChange({ label: "show me everything", link: "/all" });
  });

  const handlePointerLeave = () => {
    if (isMobile) {
      return;
    }

    document.body.style.cursor = "default";
    onHoveredItemChange(null);
  };

  return (
    <animated.group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4, 8, 8]} />
        <animated.meshBasicMaterial
          opacity={springs.opacity}
          transparent
          map={texture}
          // side={DoubleSide}
        />
      </mesh>
    </animated.group>
  );
};

export default CanvasPlane;
