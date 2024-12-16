import styled from "styled-components";
import {
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import MainMenuItem from "./MainMenuItem";
import { useLocation } from "react-router-dom";
import { OptionType } from "../../sanity";
import { useEffect, useMemo, useRef, useState } from "react";
import useMainMenu from "./useMainMenu";

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

export const MENU_HEIGHT_PX = 170;
const MENU_TOP_PX = 45;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Placeholder = styled.div<{ top: number; $animateTop: boolean }>`
  height: ${MENU_TOP_PX}px;
  margin-top: ${({ top }) => top}vh;
  transition: margin-top ${({ $animateTop }) => ($animateTop ? 0.5 : 0)}s
    ease-in-out;
`;

const MenuContainer = styled.div`
  height: ${MENU_HEIGHT_PX}px;
  margin-left: max(calc(50vw - 400px), 20px);
  display: flex;
  flex-direction: column;
  user-select: none;
  pointer-events: none;
`;

const MobileMenuMask = styled.div<{ $visible: boolean }>`
  background: #e1e1e1;
  width: 100vw;
  height: ${MENU_HEIGHT_PX}px;
  position: fixed;
  top: ${MENU_HEIGHT_PX * -0.7}px;
  z-index: -1;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s, top 0.2s;
  border-bottom-right-radius: 90%;
  box-shadow: 0 0 30px 60px #e1e1e1;
`;

const MainMenu = () => {
  const { pathname } = useLocation();

  const { appInit, hoveredItem, onHoveredItemChange } = useAppContext();

  const menuRef = useRef<HTMLDivElement>(null);

  const [init, setInit] = useState(appInit || pathname.slice(1).includes("/"));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInit(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const { showMask, collapse, top } = useMainMenu();

  const animateTop = useMemo(() => {
    const isChildPage = pathname.slice(1).includes("/");
    const isMenuAtTop =
      menuRef.current?.getBoundingClientRect().top === MENU_TOP_PX;

    return !isChildPage || !isMenuAtTop;
  }, [pathname]);

  const handleMouseLeave = () => {
    onHoveredItemChange(null);
  };

  if (!init) {
    return null;
  }

  return (
    <StickyContainer>
      <MobileMenuMask $visible={showMask} />
      <Placeholder top={top} $animateTop={animateTop} />
      <MenuContainer ref={menuRef} onMouseLeave={handleMouseLeave}>
        {MENU_OPTIONS.map((option, index) => (
          <MainMenuItem
            key={index}
            type={"type" in option ? option.type : undefined}
            label={
              "label" in option
                ? option.label
                : OPTION_TYPE_TO_LABEL[option.type]
            }
            link={
              "link" in option
                ? option.link
                : OPTION_TYPE_TO_ROOT_PATH[option.type]
            }
            indent={option.indent}
            index={index}
            hovering={"type" in option && hoveredItem?.type === option.type}
            collapse={collapse}
          />
        ))}
      </MenuContainer>
    </StickyContainer>
  );
};

export default MainMenu;
