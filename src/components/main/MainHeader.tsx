import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderObjectHitbox from "./HeaderObjectHitbox";

const Header = styled.div<{ animate: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
  font-size: 30px;
  line-height: 24px;
  animation: ${({ animate }) => (animate ? "fontFlicker 0.2s" : "none")};
  text-transform: uppercase;
  font-family: "SyneMono-Regular";

  @keyframes fontFlicker {
    0% {
      font-family: "SyneMono-Regular";
    }
    30% {
      font-family: "kaerukaeru-Regular";
    }
    60% {
      font-family: "FT88-Gothique";
    }
    100% {
      font-family: "SyneMono-Regular";
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
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

  const startFlicker = () => {
    setAnimate(true);
  };

  return (
    <Header animate={animate}>
      <StyledLink onClick={startFlicker} to={"/"}>
        NIT SU J.
      </StyledLink>
      <HeaderObjectHitbox />
    </Header>
  );
};

export default MainHeader;
