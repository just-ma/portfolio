import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import useScrollTop from "../../hooks/useScrollTop";

const Hitbox = styled.div<{ scrollTop: number }>`
  height: 7vh;
  width: 8vh;
  position: absolute;
  top: calc(10vh - ${({ scrollTop }) => scrollTop});
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
`;

const HeaderObjectHitbox = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollContainerRef } = useAppContext();
  const scrollTop = useScrollTop(scrollContainerRef);

  const handleClick = () => {
    const arr = location.pathname.split("/");

    if (arr.length > 2) {
      navigate(arr.slice(0, 2).join("/"));
    } else {
      navigate("/");
    }
  };

  if (location.pathname === "/") {
    return null;
  }

  return <Hitbox onClick={handleClick} scrollTop={scrollTop}></Hitbox>;
};

export default HeaderObjectHitbox;
