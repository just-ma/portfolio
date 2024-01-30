import styled from "styled-components";

const Thumbnail = styled.img<{ $square?: boolean }>`
  background-color: gray;
  width: 100%;
  aspect-ratio: ${({ $square }) => ($square ? 1 : 1.78)};
  border: 1px solid black;
  box-sizing: border-box;
`;

export default Thumbnail;
