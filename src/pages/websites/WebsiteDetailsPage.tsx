import { urlFor } from "../../sanity";
import { useParams } from "react-router-dom";
import BackFooter from "../../components/BackFooter";
import ScrollContainer from "../../components/ScrollContainer";
import Description from "../../components/Description";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import useDocument from "../../hooks/useDocument";
import Thumbnail from "../../components/Thumbnail";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";

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
    <ScrollContainer>
      <Thumbnail src={urlFor(thumbnail).url()} alt={title} />
      <DetailsPageInfo document={website} url={url} />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["website"]} />
    </ScrollContainer>
  );
};

export default WebsiteDetailsPage;
