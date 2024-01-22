import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const Hitbox = styled.div`
  height: 7vh;
  width: 8vh;
  position: absolute;
  top: 3vh;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 10px;
  cursor: pointer;
  /* border: 1px solid black; */
`;

const HeaderObjectHitbox = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollContainerRef } = useContext(AppContext);

  const [show, setShow] = useState(true);

  const handleScroll = () => {
    const scroll = scrollContainerRef?.current?.scrollTop;
    if (scroll === undefined) {
      return;
    }

    setShow(scroll < 90);
  };

  useEffect(() => {
    const element = scrollContainerRef?.current;
    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleClick = () => {
    const arr = location.pathname.split("/");

    if (arr.length > 2) {
      navigate(arr.slice(0, 2).join("/"));
    } else {
      navigate("/");
    }
  };

  if (!show || location.pathname === "/") {
    return null;
  }

  return <Hitbox onClick={handleClick}></Hitbox>;
};

export default HeaderObjectHitbox;
