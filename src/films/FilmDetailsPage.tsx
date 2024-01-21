import styled from "styled-components";
import { useParams } from "react-router-dom";
import VideoBlockComponent from "../components/blocks/VideoBlockComponent";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import Quote from "./Quote";
import DetailsPageInfo from "../components/detailsPage/DetailsPageInfo";
import Description from "../components/Description";
import useDocument from "../hooks/useDocument";
import { DOCUMENT_TYPE_TO_ROOT_PATH } from "../sanity";

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
      <DetailsPageInfo document={film} url={video.externalUrl} />
      <StyledQuote>{quote}</StyledQuote>
      <Description value={description} />
      <BackFooter defaultPath={DOCUMENT_TYPE_TO_ROOT_PATH["film"]} />
    </ScrollContainer>
  );
};

export default FilmDetailsPage;
