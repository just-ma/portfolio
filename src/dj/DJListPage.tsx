import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import useDocuments from "../hooks/useDocuments";
import ListPageCard from "../components/listPage/ListPageCard";

const DJsPage = () => {
  const { data } = useDocuments("dj");

  return (
    <ScrollContainer gap={60} top={50}>
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