import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import useDocuments from "../hooks/useDocuments";
import ListPageCard from "../components/listPage/ListPageCard";
import { DJDefinition } from "../sanity";

export const DJListPageCard = ({
  document,
  index,
}: {
  document: DJDefinition;
  index: number;
}) => {
  return <ListPageCard document={document} index={index} square />;
};

const DJListPage = () => {
  const { data } = useDocuments("dj");

  return (
    <ScrollContainer listPage>
      {data?.map((dj, index) => (
        <DJListPageCard key={dj.slug.current} document={dj} index={index} />
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default DJListPage;
