import styled from "styled-components";

export const Dot = styled.div<{ size?: number }>`
  background-color: blue;
  width: ${({ size = 1 }) => size * 10}px;
  height: ${({ size = 1 }) => size * 10}px;
  border-radius: 50%;
  position: absolute;
  z-index: 5;
  top: -5px;
  right: -0.5px;
  transform: translate(50%, 0);
`;
