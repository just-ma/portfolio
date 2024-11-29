import { useParams } from "react-router-dom";
import VideoBlockComponent from "../../components/blocks/VideoBlockComponent";
import BackFooter from "../../components/BackFooter";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import DividedPage, {
  CONTENT_MAX_WIDTH_PX,
} from "../../components/DividedPage";
import styled from "styled-components";

const Video = styled(VideoBlockComponent)`
  max-width: ${CONTENT_MAX_WIDTH_PX}px;
`;

const FilmDetailsPage = () => {
  const { filmId } = useParams<{
    filmId: string;
  }>();

  const { data: film } = useDocument("film", filmId);

  if (!filmId || !film) {
    return null;
  }

  const { description, video } = film;

  return (
    <DividedPage withDot>
      <Video value={{ url: video.url, width: 1920, height: 1080 }} />
      <DetailsPageInfo document={film} url={video.externalUrl} />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["film"]} />
    </DividedPage>
  );
};

export default FilmDetailsPage;
