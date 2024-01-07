import { useMemo, useState } from "react";

const useHomeMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  return useMemo(
    () => ({
      activeIndex,
      setActiveIndex: setActiveIndex,
      hovering,
      setHovering: setHovering,
    }),
    [activeIndex, hovering]
  );
};

export default useHomeMenu;
