import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { OptionType } from "../../sanity";
import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import { useEffect } from "react";
import useTextTyper from "../../hooks/useTextTyper";
import useIsMobile from "../../hooks/useMobile";
import { APPLE_MURDERER_ROOT_PATH } from "../../pages/appleMurderer/constants";

const StyledLink = styled(Link)<{ $small: boolean; $selected: boolean }>`
  font-size: calc(
    ${({ $small }) => ($small ? 1 : 3)}vw +
      ${({ $small }) => ($small ? 1 : 3)}vh
  );
  width: fit-content;
  pointer-events: all;
  color: ${({ $selected }) => ($selected ? "black" : "blue")};
  transition: font-size 0.4s;
  text-decoration: none;
`;

const Label = styled.span`
  text-decoration: underline;
`;

const MainMenuItem = ({
  type,
  hovering,
  onHoveredOptionChange,
  small,
}: {
  type: OptionType;
  hovering: boolean;
  onHoveredOptionChange: (value: OptionType | null) => void;
  small: boolean;
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const rootPath = OPTION_TYPE_TO_ROOT_PATH[type];
  const selected = pathname.startsWith(rootPath);
  const exactSelected = pathname === rootPath;
  const path = exactSelected ? "/" : rootPath;

  const isMobile = useIsMobile();

  useEffect(() => {
    onHoveredOptionChange(null);
  }, [pathname]);

  const showPreLabel = !isMobile && (hovering || selected);
  const typedLabelDelay = isHome ? 300 + OPTION_TYPES.indexOf(type) * 100 : 0;
  const preLabel = useTextTyper("> ", showPreLabel);
  const typedLabel = useTextTyper(
    OPTION_TYPE_TO_LABEL[type],
    (!isMobile && !pathname.startsWith(APPLE_MURDERER_ROOT_PATH)) || isHome,
    typedLabelDelay
  );

  const handleMouseEnter = () => {
    if (!isMobile) {
      onHoveredOptionChange(type);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      onHoveredOptionChange(null);
    }
  };

  if (!preLabel && !typedLabel) {
    return null;
  }

  return (
    <StyledLink
      to={path}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $small={small}
      $selected={selected}
    >
      <span>{preLabel}</span>
      <Label>{typedLabel}</Label>
    </StyledLink>
  );
};

export default MainMenuItem;
