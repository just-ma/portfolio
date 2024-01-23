import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { OptionType } from "../../sanity";
import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import { Suspense, useEffect } from "react";
import useTextTyper from "../../hooks/useTextTyper";
import useIsMobile from "../../hooks/useMobile";

const Container = styled.div`
  position: absolute;
  top: calc(3vw + 0.5vh + 35px);
  left: max(calc(30vw - 150px), 25px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  user-select: none;
  pointer-events: none;
`;

const StyledLink = styled(Link)`
  font-size: calc(3vw + 3vh);
  width: fit-content;
  pointer-events: all;
`;

const MenuItem = ({
  type,
  hovering,
  onHoveredOptionChange,
}: {
  type: OptionType;
  hovering: boolean;
  onHoveredOptionChange: (value: OptionType | null) => void;
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const rootPath = OPTION_TYPE_TO_ROOT_PATH[type];

  useEffect(() => {
    onHoveredOptionChange(null);
  }, [pathname]);

  const preLabel = useTextTyper("( ", hovering && isHome);
  const label = useTextTyper(OPTION_TYPE_TO_LABEL[type], isHome);
  const postLabel = useTextTyper(" )", hovering && isHome);

  const isMobile = useIsMobile();

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

  if (!preLabel && !label && !postLabel) {
    return null;
  }

  return (
    <StyledLink
      to={rootPath}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {preLabel}
      {label}
      {postLabel}
    </StyledLink>
  );
};

const MainMenu = () => {
  const { hoveredOption, onHoveredOptionChange } = useAppContext();

  const handleMouseLeave = () => {
    onHoveredOptionChange(null);
  };

  return (
    <Suspense>
      <Container onMouseLeave={handleMouseLeave}>
        {OPTION_TYPES.map((type) => (
          <MenuItem
            type={type}
            key={type}
            hovering={hoveredOption === type}
            onHoveredOptionChange={onHoveredOptionChange}
          />
        ))}
      </Container>
    </Suspense>
  );
};

export default MainMenu;
