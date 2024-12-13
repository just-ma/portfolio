import styled, { css } from "styled-components";
import GarfieldSrc from "./garfield.png";
import { useEffect, useRef, useState } from "react";
import useIsMobile from "../../hooks/useMobile";

const OverflowContainer = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  position: relative;

  > map area:hover {
    background: blue;
  }
`;

const Cat = styled.img`
  width: 200px;
  transform: rotate(80deg);
  user-select: none;
  animation: shake 0.1s infinite;

  @keyframes shake {
    0% {
      transform: rotate(80deg);
    }
    20% {
      transform: rotate(82deg);
    }
    50% {
      transform: rotate(78deg);
    }
    80% {
      transform: rotate(81deg);
    }
    100% {
      transform: rotate(80deg);
    }
  }
`;

const CatContainer = styled.div<{ $show: boolean }>`
  position: absolute;
  left: -140px;
  border-radius: 50%;
  cursor: pointer;
  transition: left ${({ $show }) => ($show ? 0.2 : 3)}s ease-in-out;

  ${({ $show }) =>
    $show &&
    css`
      left: -80px;

      ${Cat} {
        animation: none;
      }
    `}
`;

export default function Garfield({
  onPointerEnter,
  hide,
}: {
  onPointerEnter?: () => void;
  hide?: boolean;
}) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [show, setShow] = useState(false);

  const isMobile = useIsMobile();

  const handlePointerEnter = () => {
    onPointerEnter?.();
    timeoutId.current && clearTimeout(timeoutId.current);
    setShow(!hide);
  };

  const handlePointerLeave = () => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  useEffect(() => {
    if (isMobile && show) {
      handlePointerLeave();
    }
  }, [isMobile, show]);

  return (
    <OverflowContainer>
      <CatContainer $show={show}>
        <Cat
          src={GarfieldSrc}
          onMouseEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          draggable={false}
        />
      </CatContainer>
    </OverflowContainer>
  );
}
