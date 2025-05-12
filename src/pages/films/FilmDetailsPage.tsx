import { useParams } from "react-router-dom";
import VideoBlockComponent from "../../components/blocks/VideoBlockComponent";
import DetailsPageFooter from "../../components/detailsPage/DetailsPageFooter";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import DividedPage from "../../components/DividedPage";
import { Helmet } from "react-helmet";
import { OPTION_TYPE_TO_LABEL } from "../../constants";

const getLinkLabel = () => "watch on youtube";

const FilmDetailsPage = () => {
  const { filmId } = useParams<{
    filmId: string;
  }>();

  const { data: film } = useDocument("film", filmId);

  if (!filmId || !film?.description) {
    return null;
  }

  const { description, video, links, title } = film;

  return (
    <>
      <Helmet>
        <title>{`${OPTION_TYPE_TO_LABEL["film"]} — "${title}"`}</title>
      </Helmet>
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
        <DetailsPageFooter id={filmId} type="film" />
      </DividedPage>
    </>
  );
};

export default FilmDetailsPage;
