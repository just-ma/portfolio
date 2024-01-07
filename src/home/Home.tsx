import styled from "styled-components";
import HomeMenu from "./HomeMenu";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Home = ({
  onHoveredOptionChange,
}: {
  onHoveredOptionChange: (option: string | null) => void;
}) => {
  return (
    <Page>
      hi my name is Justin Ma
      <HomeMenu onHoveredOptionChange={onHoveredOptionChange} />
    </Page>
  );
};

export default Home;
