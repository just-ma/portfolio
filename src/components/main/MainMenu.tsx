import styled from "styled-components";
import {
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import MainMenuItem from "./MainMenuItem";
import { useLocation } from "react-router-dom";
import { OptionType } from "../../sanity";
import useIsMobile from "../../hooks/useMobile";
import { useMemo } from "react";

const MENU_OPTIONS: ({ indent?: boolean } & (
  | { type: OptionType }
  | { label: string; link: string }
))[] = [
  {
    type: "about",
  },
  { label: "all projects", link: "/" },
  {
    type: "website",
    indent: true,
  },
  {
    type: "film",
    indent: true,
  },
  {
    type: "dj",
    indent: true,
  },
  {
    type: "blog",
    indent: true,
  },
];

export const MENU_HEIGHT_PX = 150;
export const HOME_MENU_TOP_VH = 50;
export const MOBILE_HOME_MENU_TOP_VH = 60;
export const NESTED_MENU_TOP_VH = 20;
export const MOBILE_NESTED_MENU_TOP_VH = 40;

const Container = styled.div<{ margintop: number }>`
  position: sticky;
  top: 45px;
  margin-top: ${({ margintop }) => margintop}vh;
  margin-left: max(calc(50vw - 400px), 20px);
  display: flex;
  flex-direction: column;
  user-select: none;
  pointer-events: none;
  transition: margin-top 0.5s ease-in-out;
  z-index: 10;
`;

const MainMenu = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  const { hoveredItem, onHoveredItemChange } = useAppContext();

  const margintop = useMemo(() => {
    const isHome = pathname === "/";
    const isChildPage = pathname.slice(1).includes("/");

    if (isHome) {
      return isMobile ? MOBILE_HOME_MENU_TOP_VH : HOME_MENU_TOP_VH;
    }

    if (!isChildPage) {
      return isMobile ? MOBILE_NESTED_MENU_TOP_VH : NESTED_MENU_TOP_VH;
    }

    return 0;
  }, [pathname, isMobile]);

  const handleMouseLeave = () => {
    onHoveredItemChange(null);
  };

  return (
    <Container onMouseLeave={handleMouseLeave} margintop={margintop}>
      {MENU_OPTIONS.map((option, index) => (
        <MainMenuItem
          key={index}
          type={"type" in option ? option.type : undefined}
          label={
            "label" in option ? option.label : OPTION_TYPE_TO_LABEL[option.type]
          }
          link={
            "link" in option
              ? option.link
              : OPTION_TYPE_TO_ROOT_PATH[option.type]
          }
          indent={option.indent}
          index={index}
          hovering={"type" in option && hoveredItem?.type === option.type}
        />
      ))}
    </Container>
  );
};

export default MainMenu;
