import { useMemo } from "react";
import styled from "styled-components";

const CHAR_GAP = 12;

const Container = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

const CharContainer = styled.div<{ left: number; delay?: number }>`
  position: relative;
  cursor: default;
  left: ${({ left }) => left}px;
  opacity: 0;
  animation: show 0.2s ${({ delay }) => delay}s forwards;

  @keyframes show {
    to {
      opacity: 1;
    }
  }
`;

const Char = styled.div<{ delay: number }>`
  position: absolute;
  animation: circle 4s infinite ease;
  animation-delay: ${({ delay }) => delay}s;
  transform: translate(-50%, 0);

  @keyframes circle {
    0% {
      left: 0px;
      top: -5px;
    }
    25% {
      left: 2px;
    }
    50% {
      top: 5px;
    }
    75% {
      left: -2px;
    }
    100% {
      left: 0px;
      top: -5px;
    }
  }
`;

const FloatingText = ({
  children,
  className,
  animate,
}: {
  children: string;
  className?: string;
  animate?: boolean;
}) => {
  const [arr, offset] = useMemo(() => {
    return [children.split(""), Math.random()];
  }, [children]);

  return (
    <Container className={className} width={(children.length - 1) * CHAR_GAP}>
      {arr.map((char, index) => (
        <CharContainer
          key={index}
          left={index * CHAR_GAP}
          delay={animate ? index * 0.05 : 0}
        >
          <Char delay={index * 0.2 - 200 + offset}>{char}</Char>
        </CharContainer>
      ))}
    </Container>
  );
};

export default FloatingText;
