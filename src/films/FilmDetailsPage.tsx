import styled from "styled-components";
import { useParams } from "react-router-dom";
import VideoBlockComponent from "../components/VideoBlockComponent";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import Quote from "./Quote";
import DetailsPageInfo from "../components/DetailsPageInfo";
import DetailsPageDescription from "../components/DetailsPageDescription";
import useDocument from "../hooks/useDocument";

const StyledQuote = styled(Quote)`
  margin-bottom: 50px;
`;

const FilmDetailsPage = () => {
  const { filmId } = useParams<{
    filmId: string;
  }>();

  const { data: film } = useDocument("film", filmId);

  if (!filmId || !film) {
    return null;
  }

  const { description, video, quote } = film;

  return (
    <ScrollContainer>
      <VideoBlockComponent value={video} />
      <DetailsPageInfo document={film} />
      <StyledQuote>{quote}</StyledQuote>
      <DetailsPageDescription value={description} />
      <BackFooter defaultPath="/films" />
    </ScrollContainer>
  );
};

export default FilmDetailsPage;