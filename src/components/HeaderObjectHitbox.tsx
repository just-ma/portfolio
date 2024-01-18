import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

const Hitbox = styled.div<{ height: number }>`
  width: 61px;
  height: ${({ height }) => height}px;
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 10px;
  cursor: pointer;
`;

const HeaderObjectHitbox = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollContainerRef } = useContext(AppContext);

  const [height, setHeight] = useState(56);

  const handleScroll = () => {
    const scroll = scrollContainerRef?.current?.scrollTop;
    if (scroll === undefined) {
      return;
    }

    setHeight(Math.max(0, Math.min(128 - scroll, 56)));
  };

  useEffect(() => {
    const element = scrollContainerRef?.current;
    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    const arr = location.pathname.split("/");

    if (location.key !== "default") {
      navigate(-1);
    } else if (arr.length > 2) {
      navigate(arr.slice(0, 2).join("/"));
    } else {
      navigate("/");
    }
  };

  return <Hitbox height={height} onClick={handleClick}></Hitbox>;
};

export default HeaderObjectHitbox;
