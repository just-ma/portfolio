import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { OptionType } from "../../sanity";
import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import useTextTyper from "../../hooks/useTextTyper";

const Container = styled.div`
  position: absolute;
  top: 45px;
  left: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  width: fit-content;
  min-width: 60px;
`;

const MenuItem = ({
  type,
  onHoveredOptionChange,
  scrollToTop,
}: {
  type: OptionType;
  onHoveredOptionChange: (value: OptionType) => void;
  scrollToTop: () => void;
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const rootPath = OPTION_TYPE_TO_ROOT_PATH[type];

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setHovering(false);
  }, [pathname]);

  const preLabel = useTextTyper("( ", hovering && isHome);
  const label = useTextTyper(OPTION_TYPE_TO_LABEL[type], isHome);
  const postLabel = useTextTyper(" )", hovering && isHome);

  const handleMouseEnter = () => {
    onHoveredOptionChange(type);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const handleClick = () => {
    if (pathname === rootPath) {
      scrollToTop();
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
      onClick={handleClick}
    >
      {preLabel}
      {label}
      {postLabel}
    </StyledLink>
  );
};

const MainMenu = () => {
  const { onHoveredOptionChange, scrollContainerRef } = useAppContext();

  const handleMouseLeave = () => {
    onHoveredOptionChange(null);
  };

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container onMouseLeave={handleMouseLeave}>
      {OPTION_TYPES.map((type) => (
        <MenuItem
          type={type}
          key={type}
          onHoveredOptionChange={onHoveredOptionChange}
          scrollToTop={scrollToTop}
        />
      ))}
    </Container>
  );
};

export default MainMenu;
