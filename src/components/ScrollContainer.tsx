import styled from "styled-components";

const ScrollColumn = styled.div<{ gap?: number; top?: number }>`
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ gap }) => gap}px;
  margin: ${({ top }) => top || 15}vh auto 0;
  padding: 0 10px 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const ScrollContainer = ({
  children,
  gap = 10,
  top,
}: {
  children: React.ReactNode;
  gap?: number;
  top?: number;
}) => {
  return (
    <ScrollColumn gap={gap} top={top}>
      {children}
    </ScrollColumn>
  );
};

export default ScrollContainer;
