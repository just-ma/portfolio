import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import type { Group, Mesh, Object3DEventMap, Texture } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import AlmondTexture from "../../../assets/models/almond/textures/Almond2_Diffuse.jpg";
import AlmondNormal from "../../../assets/models/almond/textures/Almond2_Normal.jpg";
import AlmondObj from "../../../assets/models/almond/Almond_2.obj";

export default function AlmondModel() {
  const obj = useLoader(OBJLoader, AlmondObj) as Group<Object3DEventMap>;
  const texture = useTexture(AlmondTexture) as Texture;
  const normal = useTexture(AlmondNormal) as Texture;

  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);

  return (
    <mesh scale={2} geometry={geometry} position={[0, -2.5, 0]}>
      <meshPhysicalMaterial map={texture} normalMap={normal} />
    </mesh>
  );
}
