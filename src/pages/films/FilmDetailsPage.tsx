import { useParams } from "react-router-dom";
import VideoBlockComponent from "../../components/blocks/VideoBlockComponent";
import BackFooter from "../../components/BackFooter";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import DividedPage from "../../components/DividedPage";

const getLinkLabel = () => "watch on youtube";

const FilmDetailsPage = () => {
  const { filmId } = useParams<{
    filmId: string;
  }>();

  const { data: film } = useDocument("film", filmId);

  if (!filmId || !film) {
    return null;
  }

  const { description, video, links } = film;

  return (
    <DividedPage withDot>
      <VideoBlockComponent
        value={{ url: video.url, width: 1920, height: 1080 }}
      />
      <DetailsPageInfo
        document={film}
        links={links}
        getLinkLabel={getLinkLabel}
      />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["film"]} />
    </DividedPage>
  );
};

export default FilmDetailsPage;
