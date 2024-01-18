import HomeMenu from "./HomeMenu";

const HomePage = ({
  setActiveIndex,
  setHovering,
}: {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return <HomeMenu setActiveIndex={setActiveIndex} setHovering={setHovering} />;
};

export default HomePage;
