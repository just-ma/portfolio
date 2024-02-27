import { createContext, useContext, useMemo, useState } from "react";
import { OptionType } from "../sanity";
import { useLocation } from "react-router-dom";
import { APPLE_MURDERER_ROOT_PATH } from "../pages/appleMurderer/constants";

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
  theme: string;
}>({
  hoveredOption: null,
  onHoveredOptionChange: noop,
  titleAnimating: true,
  onTitleAnimatingChange: noop,
  theme: "light",
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  const [hoveredOption, setHoveredOption] = useState<OptionType | null>(null);
  const [titleAnimating, setTitleAnimating] = useState(true);

  const theme = useMemo(() => {
    const isDark = pathname.startsWith(APPLE_MURDERER_ROOT_PATH);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return isDark ? "dark" : "light";
  }, [pathname]);

  const value = useMemo(
    () => ({
      hoveredOption,
      onHoveredOptionChange: setHoveredOption,
      titleAnimating,
      onTitleAnimatingChange: setTitleAnimating,
      theme,
    }),
    [hoveredOption, titleAnimating, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
