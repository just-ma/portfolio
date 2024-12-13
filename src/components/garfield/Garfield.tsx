import styled, { css } from "styled-components";
import GarfieldSrc from "./garfield.png";
import { useEffect, useMemo, useRef, useState } from "react";
import useIsMobile from "../../hooks/useMobile";
import FloatingText from "../FloatingText";
import { useLocation } from "react-router-dom";

const OverflowContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
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
  bottom: 0;
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

const Message = styled.div`
  position: absolute;
  left: 220px;
  top: 70px;
`;

export default function Garfield({
  onPointerEnter,
  stayHidden,
  messages,
}: {
  onPointerEnter?: () => void;
  stayHidden?: boolean;
  messages: string[];
}) {
  const { pathname } = useLocation();

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [show, setShow] = useState(false);

  const isMobile = useIsMobile();

  const handlePointerEnter = () => {
    onPointerEnter?.();
    timeoutId.current && clearTimeout(timeoutId.current);
    setShow(!stayHidden);
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

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  const message = useMemo(() => {
    return messages[Math.round((messages.length - 1) * Math.random())];
  }, [messages, show]);

  return (
    <OverflowContainer>
      <CatContainer $show={show}>
        <Cat
          src={GarfieldSrc}
          onMouseEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          draggable={false}
        />
        {show && (
          <Message>
            <FloatingText animate>{message}</FloatingText>
          </Message>
        )}
      </CatContainer>
    </OverflowContainer>
  );
}
