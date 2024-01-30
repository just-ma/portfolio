import { useEffect, useState } from "react";

const getIsMobile = (): boolean => {
  return window.innerWidth <= 600;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  const handleWindowResize = (): void => {
    setIsMobile(getIsMobile());
  };

  useEffect((): (() => void) => {
    window.addEventListener("resize", handleWindowResize, { passive: true });

    return (): void => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
