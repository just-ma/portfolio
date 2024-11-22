import styled from "styled-components";
import { useParams } from "react-router-dom";
import VideoBlockComponent from "../../components/blocks/VideoBlockComponent";
import BackFooter from "../../components/BackFooter";
import Quote from "./Quote";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import DividedPage from "../../components/DividedPage";

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
    <DividedPage withDot>
      <VideoBlockComponent value={video} />
      <DetailsPageInfo document={film} url={video.externalUrl} />
      <StyledQuote>{quote}</StyledQuote>
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["film"]} />
    </DividedPage>
  );
};

export default FilmDetailsPage;
