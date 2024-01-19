import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import ListPageCard from "../components/ListPageCard";
import useDocuments from "../hooks/useDocuments";

const WebsitesListPage = () => {
  const { data } = useDocuments("website");

  return (
    <ScrollContainer gap={60}>
      {data?.map((website, index) => (
        <ListPageCard
          key={website.slug.current}
          document={website}
          rootPath="websites"
          index={index}
        />
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default WebsitesListPage;
