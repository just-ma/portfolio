import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useScrollTop = (
  scrollContainerRef: React.RefObject<HTMLDivElement> | null
) => {
  const location = useLocation();

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    const scroll = scrollContainerRef?.current?.scrollTop;
    if (scroll === undefined) {
      return;
    }

    setScrollTop(scroll);
  };

  useEffect(() => {
    const element = scrollContainerRef?.current;
    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
      setScrollTop(0);
    };
  }, [location.pathname]);

  return scrollTop;
};

export default useScrollTop;
