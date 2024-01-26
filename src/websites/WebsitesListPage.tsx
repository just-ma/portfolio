import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import ListPageCard from "../components/listPage/ListPageCard";
import useDocuments from "../hooks/useDocuments";
import { WebsiteDefinition } from "../sanity";

export const WebsitesListPageCard = ({
  document,
  index,
}: {
  document: WebsiteDefinition;
  index: number;
}) => {
  return <ListPageCard document={document} index={index} />;
};

const WebsitesListPage = () => {
  const { data } = useDocuments("website");

  return (
    <ScrollContainer listPage>
      {data?.map((website, index) => (
        <WebsitesListPageCard
          key={website.slug.current}
          document={website}
          index={index}
        />
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default WebsitesListPage;
