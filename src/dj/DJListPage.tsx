import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import useDocuments from "../hooks/useDocuments";
import ListPageCard from "../components/listPage/ListPageCard";
import usePageTitleSetter from "../hooks/usePageTitleSetter";

const DJsPage = () => {
  const { data } = useDocuments("dj");

  usePageTitleSetter("dj");

  return (
    <ScrollContainer gap={60}>
      {data?.map((dj, index) => (
        <ListPageCard
          key={dj.slug.current}
          document={dj}
          index={index}
          square
        />
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default DJsPage;
