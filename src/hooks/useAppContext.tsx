import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { OptionType } from "../sanity";
import { useLocation } from "react-router-dom";
import { APPLE_MURDERER_ROOT_PATH } from "../pages/appleMurderer/constants";

export type TableItem = {
  type?: OptionType;
  label: string;
  link: string;
};

const noop = () => {};

const AppContext = createContext<{
  hoveredItem: TableItem | null;
  onHoveredItemChange: (value: TableItem | null) => void;
  titleAnimating: boolean;
  onTitleAnimatingChange: (value: boolean) => void;
  theme: string;
  isInitialLoad: boolean;
}>({
  hoveredItem: null,
  onHoveredItemChange: noop,
  titleAnimating: true,
  onTitleAnimatingChange: noop,
  theme: "light",
  isInitialLoad: true,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  const isInitialLoad = useRef(true);

  const [hoveredItem, setHoveredItem] = useState<TableItem | null>(null);
  const [titleAnimating, setTitleAnimating] = useState(true);

  useEffect(() => {
    isInitialLoad.current = false;
  }, []);

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
      hoveredItem,
      onHoveredItemChange: setHoveredItem,
      titleAnimating,
      onTitleAnimatingChange: setTitleAnimating,
      theme,
      isInitialLoad: isInitialLoad.current,
    }),
    [hoveredItem, titleAnimating, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
