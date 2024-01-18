import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { MENU_OPTIONS } from "../constants";

const Header = styled.div<{ animate: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
  font-size: 30px;
  line-height: 24px;
  animation: ${({ animate }) => (animate ? "flicker 0.1s infinite" : "none")};
  text-transform: uppercase;

  @keyframes flicker {
    0% {
      opacity: 0.5;
    }
    30% {
      opacity: 0.3;
    }
    60% {
      opacity: 0.6;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Subtitle = styled.div`
  font-size: 20px;
  margin: 5px 0 0 10px;

  :before {
    content: "( ";
  }

  :after {
    content: " )";
  }
`;

const MainHeader = () => {
  const { pathname } = useLocation();

  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimate(false);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animate]);

  useEffect(() => {
    setAnimate(true);
  }, [pathname]);

  const currentOption = useMemo(() => {
    const match = MENU_OPTIONS.find((option) =>
      pathname.startsWith(option.path)
    );
    return match;
  }, [pathname]);

  const startFlicker = () => {
    setAnimate(true);
  };

  return (
    <Header animate={animate}>
      <StyledLink onClick={startFlicker} to={"/"}>
        NIT SU J.
      </StyledLink>
      {currentOption && (
        <Subtitle>
          <StyledLink onClick={startFlicker} to={currentOption.path}>
            {currentOption.label}
          </StyledLink>
        </Subtitle>
      )}
    </Header>
  );
};

export default MainHeader;
