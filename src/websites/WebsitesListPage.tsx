import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import ListPageCard from "../components/listPage/ListPageCard";
import useDocuments from "../hooks/useDocuments";

const WebsitesListPage = () => {
  const { data } = useDocuments("website");

  return (
    <ScrollContainer gap={60} top={50}>
      {data?.map((website, index) => (
        <ListPageCard
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
