import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import useDocuments from "../hooks/useDocuments";
import ListPageCard from "../components/listPage/ListPageCard";

const DJListPage = () => {
  const { data } = useDocuments("dj");

  return (
    <ScrollContainer listPage>
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

export default DJListPage;
