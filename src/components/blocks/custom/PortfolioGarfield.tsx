import styled from "styled-components";
import Garfield from "../../garfield/Garfield";
import { MEDIA_SIZE } from "../../../constants";

const Container = styled.div`
  height: 200px;
  margin-left: -50px;

  @media ${MEDIA_SIZE.mobile} {
    margin-left: -20px;
  }
`;

const MESSAGES = [
  "UM... IDK WHAT TO TALK ABOUT",
  "...",
  "SO HOW YOU KNOW JUSTIN?",
  "I MET JUSTIN THRU ALIEXPRESS",
  "I'M OK WITH SILENCE",
  "WHAT DO YOU WANT ME TO SAY?",
  "HAVE WE MET BEFORE?",
  "I FORGOT YOUR NAME",
];

export default function PortfolioGarfield() {
  return (
    <Container>
      <Garfield messages={MESSAGES} />
    </Container>
  );
}
