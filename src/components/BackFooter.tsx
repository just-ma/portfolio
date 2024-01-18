import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 40% 0;
  cursor: pointer;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const BackFooter = ({ defaultPath }: { defaultPath?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.key === "default") {
      navigate(defaultPath || "/");
      return;
    }

    navigate(-1);
  };

  return (
    <Container onClick={handleClick}>
      {"<-- "}
      <Underline>back</Underline>
    </Container>
  );
};

export default BackFooter;
