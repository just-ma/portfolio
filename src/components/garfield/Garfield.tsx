import styled, { css } from "styled-components";
import GarfieldSrc from "./garfield.png";
import { useEffect, useMemo, useRef, useState } from "react";
import useIsMobile from "../../hooks/useMobile";
import FloatingText from "../FloatingText";
import { useLocation } from "react-router-dom";
import { MEDIA_SIZE } from "../../constants";

const OverflowContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Cat = styled.img`
  width: 200px;
  transform: rotate(80deg);
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  animation: shake 0.1s infinite;

  @media ${MEDIA_SIZE.mobile} {
    width: 150px;
  }

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
  left: ${({ $show }) => ($show ? -80 : -140)}px;
  bottom: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: left ${({ $show }) => ($show ? 0.2 : 3)}s ease-in-out;

  ${Cat} {
    ${({ $show }) =>
      $show &&
      css`
        animation: none;
      `}
  }

  @media ${MEDIA_SIZE.mobile} {
    left: ${({ $show }) => ($show ? -60 : -100)}px;
  }
`;

const Message = styled.div`
  position: absolute;
  left: 220px;
  top: 70px;

  @media ${MEDIA_SIZE.mobile} {
    left: 170px;
    top: 55px;
    transform: scale(0.8);
    transform-origin: left;
  }
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

  const handlePointerDown = () => {
    if (show) {
      timeoutId.current && clearTimeout(timeoutId.current);
      setShow(false);
    } else {
      handlePointerEnter();
    }
  };

  const handlePointerLeave = () => {
    if (!show) {
      return;
    }

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
          onPointerEnter={isMobile ? undefined : handlePointerEnter}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          draggable={false}
          onContextMenu={() => false}
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
