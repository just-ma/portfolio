import BackFooter from "../../components/BackFooter";
import ScrollContainer from "../../components/ScrollContainer";
import ListPageCard from "../../components/listPage/ListPageCard";
import Quote from "./Quote";
import useDocuments from "../../hooks/useDocuments";
import { FilmDefinition } from "../../sanity";

export const FilmsListPageCard = ({
  document,
  index,
}: {
  document: FilmDefinition;
  index: number;
}) => {
  return (
    <ListPageCard document={document} index={index}>
      <Quote>{document.quote}</Quote>
    </ListPageCard>
  );
};

const FilmsPage = () => {
  const { data } = useDocuments("film");

  return (
    <ScrollContainer listPage>
      {data?.map((film, index) => (
        <FilmsListPageCard
          key={film.slug.current}
          index={index}
          document={film}
        />
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default FilmsPage;
