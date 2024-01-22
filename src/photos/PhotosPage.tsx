import ScrollContainer from "../components/ScrollContainer";
import usePageTitleSetter from "../hooks/usePageTitleSetter";

const PhotosPage = () => {
  usePageTitleSetter("blog");

  return <ScrollContainer>photos hopefully</ScrollContainer>;
};

export default PhotosPage;
