import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useTextTyper from "../../hooks/useTextTyper";
import useIsMobile from "../../hooks/useMobile";
import { APPLE_MURDERER_ROOT_PATH } from "../../pages/appleMurderer/constants";
import useAppContext from "../../hooks/useAppContext";
import { MEDIA_SIZE } from "../../constants";
import { OptionType } from "../../sanity";

const Label = styled.span`
  border: 1px solid blue;
  padding: 0 5px;
  transition: margin-left 0.1s ease-in-out, background-color 0.1s, color 0.1s;
  border-bottom-right-radius: 5px;
`;

const hoverCss = css<{ $selected: boolean }>`
  @media ${MEDIA_SIZE.desktop} {
    ${Label} {
      background-color: ${({ $selected }) => ($selected ? "#34d08c" : "white")};
      transition: background-color 0s;
    }
  }
`;

const StyledLink = styled(Link)<{
  $indent?: boolean;
  $selected: boolean;
  $hovering: boolean;
}>`
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  width: fit-content;
  pointer-events: all;
  transition: font-size 0.4s;
  text-decoration: none;
  margin-bottom: 2px;
  margin-left: ${({ $indent }) => ($indent ? 30 : 0)}px;

  ${Label} {
    background-color: ${({ $selected }) => ($selected ? "#3eb380" : "#e3e3e3")};
    color: ${({ $selected }) => ($selected ? "#fbffe1" : "blue")};
  }

  &:hover {
    ${hoverCss}
  }

  ${({ $hovering }) => $hovering && hoverCss}

  &:active {
    ${Label} {
      animation: ${({ $selected }) => ($selected ? "blink" : "none")} 0.2s;
      transition: background-color 0s;

      @keyframes blink {
        from {
          background-color: black;
        }
      }
    }
  }
`;

const Indent = styled.div`
  margin: 0 6px;
  display: inline-block;
  line-height: 20px;
  color: blue;
`;

const MainMenuItem = ({
  type,
  label,
  link,
  indent,
  index,
  hovering,
}: {
  type?: OptionType;
  label: string;
  link: string;
  indent?: boolean;
  index: number;
  hovering: boolean;
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const exactSelected = pathname === link;
  const selected = link === "/" ? exactSelected : pathname.startsWith(link);

  const isMobile = useIsMobile();
  const { onHoveredItemChange } = useAppContext();

  useEffect(() => {
    onHoveredItemChange(null);
  }, [pathname]);

  const typedLabelDelay = isHome ? 300 + index * 100 : 0;
  const typedLabel = useTextTyper(
    label,
    !pathname.startsWith(APPLE_MURDERER_ROOT_PATH) || isHome,
    typedLabelDelay
  );

  const handleMouseEnter = () => {
    if (!isMobile) {
      onHoveredItemChange({ label, link, type });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      onHoveredItemChange(null);
    }
  };

  const handleClick = () => {
    if (!selected) {
      return;
    }

    if (link === "/" && window.scrollY < window.innerHeight - 280) {
      window.scrollTo({ top: window.innerHeight - 280, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!typedLabel) {
    return null;
  }

  return (
    <StyledLink
      to={link}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $selected={selected}
      $indent={indent}
      $hovering={hovering}
      onClick={handleClick}
    >
      <Indent>{"∟"}</Indent>
      <Label>{typedLabel}</Label>
    </StyledLink>
  );
};

export default MainMenuItem;
