import { createContext, useContext, useMemo, useRef, useState } from "react";
import { OptionType } from "../sanity";

const AppContext = createContext<{
  scrollContainerRef: React.RefObject<HTMLDivElement> | null;
  hoveredOption: OptionType | null;
  onHoveredOptionChange: (value: OptionType | null) => void;
}>({
  scrollContainerRef: null,
  hoveredOption: null,
  onHoveredOptionChange: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [hoveredOption, setHoveredOption] = useState<OptionType | null>(null);

  const value = useMemo(
    () => ({
      scrollContainerRef,
      hoveredOption,
      onHoveredOptionChange: setHoveredOption,
    }),
    [hoveredOption]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
