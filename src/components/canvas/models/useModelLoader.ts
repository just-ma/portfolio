import { ObjectMap, useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect } from "react";

const useModelLoader = (model: any, opacity: number) => {
  const gltf = useLoader(GLTFLoader, model) as GLTF & ObjectMap;

  useEffect(() => {
    gltf.materials[""].transparent = true;
  }, []);

  useEffect(() => {
    gltf.materials[""].opacity = opacity;
  }, [opacity]);

  return gltf.scene;
};

export default useModelLoader;
