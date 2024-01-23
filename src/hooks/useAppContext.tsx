import { createContext, useContext, useMemo, useState } from "react";
import { OptionType } from "../sanity";

export type PageTitle = {
  optionType?: OptionType;
  title?: string;
  link?: string;
};

const noop = () => {};

const AppContext = createContext<{
  hoveredOption: OptionType | null;
  onHoveredOptionChange: (value: OptionType | null) => void;
  animating: boolean;
  onAnimatingChange: (value: boolean) => void;
}>({
  hoveredOption: null,
  onHoveredOptionChange: noop,
  animating: true,
  onAnimatingChange: noop,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredOption, setHoveredOption] = useState<OptionType | null>(null);
  const [animating, setAnimating] = useState(true);

  const value = useMemo(
    () => ({
      hoveredOption,
      onHoveredOptionChange: setHoveredOption,
      animating,
      onAnimatingChange: setAnimating,
    }),
    [hoveredOption, animating]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
