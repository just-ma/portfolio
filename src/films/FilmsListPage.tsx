import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import ListPageCard from "../components/ListPageCard";
import Quote from "./Quote";
import useDocuments from "../hooks/useDocuments";

const FilmsPage = () => {
  const { data } = useDocuments("film");

  return (
    <ScrollContainer gap={60}>
      {data?.map((film, index) => (
        <ListPageCard
          key={film.slug.current}
          index={index}
          document={film}
          rootPath="films"
        >
          <Quote>{film.quote}</Quote>
        </ListPageCard>
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default FilmsPage;
