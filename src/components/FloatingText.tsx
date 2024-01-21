import { useMemo } from "react";
import styled from "styled-components";

const CHAR_GAP = 15;

const Container = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

const CharContainer = styled.div<{ left: number }>`
  position: relative;
  cursor: default;
  left: ${({ left }) => left}px;
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
}: {
  children: string;
  className?: string;
}) => {
  const [arr, offset] = useMemo(() => {
    return [children.split(""), Math.random()];
  }, [children]);

  return (
    <Container className={className} width={(children.length - 1) * CHAR_GAP}>
      {arr.map((char, index) => (
        <CharContainer key={index} left={index * CHAR_GAP}>
          <Char delay={index * 0.2 - 20 + offset}>{char}</Char>
        </CharContainer>
      ))}
    </Container>
  );
};

export default FloatingText;
