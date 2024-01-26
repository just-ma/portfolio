import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 40% 0;
  cursor: pointer;
  user-select: none;
  color: blue;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const BackFooter = ({ defaultPath }: { defaultPath?: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(defaultPath || "/");
  };

  return (
    <Container onClick={handleClick}>
      {"<-- "}
      <Underline>back</Underline>
    </Container>
  );
};

export default BackFooter;
