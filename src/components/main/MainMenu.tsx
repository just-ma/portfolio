import styled, { css } from "styled-components";
import { MEDIA_SIZE, OPTION_TYPES } from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import { Suspense, useEffect, useRef, useState } from "react";
import MainMenuItem from "./MainMenuItem";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div<{ small: boolean }>`
  position: fixed;
  top: calc(3vw + 0.5vh + 35px);
  left: max(calc(30vw - 150px), 25px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  user-select: none;
  pointer-events: none;

  @media ${MEDIA_SIZE.desktop} {
    transition: top 0.4s, left 0.4s;

    ${({ small }) =>
      small &&
      css`
        top: 60px;
        left: 50px;
      `};
  }
`;

const MainMenu = () => {
  const { pathname } = useLocation();

  const { hoveredOption, onHoveredOptionChange } = useAppContext();

  const [small, setSmall] = useState(pathname !== "/");

  useEffect(() => {
    setSmall(pathname !== "/");
  }, [pathname]);

  const handleMouseLeave = () => {
    onHoveredOptionChange(null);
  };

  return (
    <Suspense>
      <Container onMouseLeave={handleMouseLeave} small={small}>
        {OPTION_TYPES.map((type) => (
          <MainMenuItem
            type={type}
            key={type}
            hovering={hoveredOption === type}
            onHoveredOptionChange={onHoveredOptionChange}
            small={small}
          />
        ))}
      </Container>
    </Suspense>
  );
};

export default MainMenu;
