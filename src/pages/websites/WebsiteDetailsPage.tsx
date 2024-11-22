import { urlFor } from "../../sanity";
import { useParams } from "react-router-dom";
import BackFooter from "../../components/BackFooter";
import Description from "../../components/Description";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import useDocument from "../../hooks/useDocument";
import Thumbnail from "../../components/Thumbnail";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import DividedPage from "../../components/DividedPage";
import styled from "styled-components";

const StyledThumbnail = styled(Thumbnail)`
  max-height: 50vh;
`;

const WebsiteDetailsPage = () => {
  const { websiteId } = useParams<{
    websiteId: string;
  }>();

  const { data: website } = useDocument("website", websiteId);

  if (!websiteId || !website) {
    return null;
  }

  const { thumbnail, description, url, title } = website;

  return (
    <DividedPage withDot>
      <StyledThumbnail src={urlFor(thumbnail).url()} alt={title} />
      <DetailsPageInfo document={website} url={url} />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["website"]} />
    </DividedPage>
  );
};

export default WebsiteDetailsPage;
