import styled from "styled-components";

const Quote = styled.div`
  font-style: italic;
  align-self: center;
  width: 70%;
  text-align: center;
  margin-top: 20px;
  color: grey;

  &::before {
    content: '"';
  }

  &::after {
    content: '"';
  }
`;

export default Quote;
