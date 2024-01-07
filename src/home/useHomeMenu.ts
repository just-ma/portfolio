import { useMemo, useState } from "react";

const useHomeMenu = () => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return useMemo(
    () => ({ hoveredOption, onHoveredOptionChange: setHoveredOption }),
    [hoveredOption]
  );
};

export default useHomeMenu;
