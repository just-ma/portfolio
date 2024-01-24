import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import ListPageCard from "../components/listPage/ListPageCard";
import Quote from "./Quote";
import useDocuments from "../hooks/useDocuments";

const FilmsPage = () => {
  const { data } = useDocuments("film");

  return (
    <ScrollContainer listPage>
      {data?.map((film, index) => (
        <ListPageCard key={film.slug.current} index={index} document={film}>
          <Quote>{film.quote}</Quote>
        </ListPageCard>
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default FilmsPage;
