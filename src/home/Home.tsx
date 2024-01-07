import styled from "styled-components";
import HomeMenu from "./HomeMenu";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Home = ({
  setActiveIndex,
  setHovering,
}: {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Page>
      hi my name is Justin Ma
      <HomeMenu setActiveIndex={setActiveIndex} setHovering={setHovering} />
    </Page>
  );
};

export default Home;
