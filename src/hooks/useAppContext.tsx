import { createContext, useContext, useMemo, useRef, useState } from "react";
import { OptionType } from "../sanity";

export type PageTitle = {
  optionType?: OptionType;
  title?: string;
  link?: string;
};

const noop = () => {};

const AppContext = createContext<{
  scrollContainerRef: React.RefObject<HTMLDivElement> | null;
  hoveredOption: OptionType | null;
  onHoveredOptionChange: (value: OptionType | null) => void;
  animating: boolean;
  onAnimatingChange: (value: boolean) => void;
  pageTitle: PageTitle;
  onPageTitleChange: (value: PageTitle) => void;
}>({
  scrollContainerRef: null,
  hoveredOption: null,
  onHoveredOptionChange: noop,
  animating: true,
  onAnimatingChange: noop,
  pageTitle: {},
  onPageTitleChange: noop,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [hoveredOption, setHoveredOption] = useState<OptionType | null>(null);
  const [animating, setAnimating] = useState(true);
  const [pageTitle, setPageTitle] = useState<PageTitle>({});

  const value = useMemo(
    () => ({
      scrollContainerRef,
      hoveredOption,
      onHoveredOptionChange: setHoveredOption,
      animating,
      onAnimatingChange: setAnimating,
      pageTitle,
      onPageTitleChange: setPageTitle,
    }),
    [hoveredOption, animating, pageTitle]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
