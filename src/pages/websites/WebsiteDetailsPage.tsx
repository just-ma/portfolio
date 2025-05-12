import { urlFor } from "../../sanity";
import { useParams } from "react-router-dom";
import DetailsPageFooter from "../../components/detailsPage/DetailsPageFooter";
import Description from "../../components/Description";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import useDocument from "../../hooks/useDocument";
import Thumbnail from "../../components/Thumbnail";
import DividedPage from "../../components/DividedPage";
import styled from "styled-components";
import VideoBlockComponent from "../../components/blocks/VideoBlockComponent";
import { Helmet } from "react-helmet";
import { OPTION_TYPE_TO_LABEL } from "../../constants";

const StyledThumbnail = styled(Thumbnail)`
  aspect-ratio: 1.78;
`;

const getLinkLabel = (url: string) => {
  if (url.includes("github.com")) {
    return "view github";
  }

  return "visit website";
};

const WebsiteDetailsPage = () => {
  const { websiteId } = useParams<{
    websiteId: string;
  }>();

  const { data: website } = useDocument("website", websiteId);

  if (!websiteId || !website?.description) {
    return null;
  }

  const { thumbnail, videoThumbnail, description, title, links } = website;

  return (
    <>
      <Helmet>
        <title>{`${OPTION_TYPE_TO_LABEL["website"]} — "${title}"`}</title>
      </Helmet>
      <DividedPage withDot>
        {videoThumbnail ? (
          <VideoBlockComponent
            value={{ url: videoThumbnail, width: 1920, height: 1080 }}
          />
        ) : (
          <StyledThumbnail src={urlFor(thumbnail).url()} alt={title} />
        )}
        <DetailsPageInfo
          document={website}
          links={links}
          getLinkLabel={getLinkLabel}
        />
        <Description value={description} />
        <DetailsPageFooter id={websiteId} type="website" />
      </DividedPage>
    </>
  );
};

export default WebsiteDetailsPage;
