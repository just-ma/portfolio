import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useIsMobile from "../../hooks/useMobile";

export const HOME_MENU_TOP_VH = 50;
export const MOBILE_HOME_MENU_TOP_VH = 50;
export const NESTED_MENU_TOP_VH = 20;
export const MOBILE_NESTED_MENU_TOP_VH = 20;

export default function useMainMenu() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isChildPage = pathname.slice(1).includes("/");

  const isMobile = useIsMobile();

  const top = useMemo(() => {
    if (isHome) {
      return isMobile ? MOBILE_HOME_MENU_TOP_VH : HOME_MENU_TOP_VH;
    }

    if (!isChildPage) {
      return isMobile ? MOBILE_NESTED_MENU_TOP_VH : NESTED_MENU_TOP_VH;
    }

    return 0;
  }, [pathname, isMobile]);

  const getCollapse = () => {
    if (!isMobile) {
      return false;
    }

    if (isChildPage) {
      return true;
    }

    return window.scrollY >= (window.innerHeight * top) / 100;
  };

  const [showMask, setShowMask] = useState(false);
  const [collapse, setCollapse] = useState(getCollapse());

  const handleScroll = () => {
    const maskThreshold = isHome
      ? window.innerHeight / 2
      : pathname.slice(1).includes("/")
      ? 0
      : 140;
    setShowMask(window.scrollY > maskThreshold);
    setCollapse(getCollapse());
  };

  useEffect(() => {
    setCollapse(getCollapse());
    isMobile && window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isMobile, top]);

  return {
    showMask,
    collapse,
    top,
  };
}
