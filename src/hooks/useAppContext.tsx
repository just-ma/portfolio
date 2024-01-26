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
  titleAnimating: boolean;
  onTitleAnimatingChange: (value: boolean) => void;
}>({
  hoveredOption: null,
  onHoveredOptionChange: noop,
  titleAnimating: true,
  onTitleAnimatingChange: noop,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoveredOption, setHoveredOption] = useState<OptionType | null>(null);
  const [titleAnimating, setTitleAnimating] = useState(true);

  const value = useMemo(
    () => ({
      hoveredOption,
      onHoveredOptionChange: setHoveredOption,
      titleAnimating,
      onTitleAnimatingChange: setTitleAnimating,
    }),
    [hoveredOption, titleAnimating]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
