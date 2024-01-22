import { urlFor } from "../sanity";
import { useParams } from "react-router-dom";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import Description from "../components/Description";
import DetailsPageInfo from "../components/detailsPage/DetailsPageInfo";
import useDocument from "../hooks/useDocument";
import Thumbnail from "../components/Thumbnail";
import { OPTION_TYPE_TO_ROOT_PATH } from "../constants";
import usePageTitleSetter from "../hooks/usePageTitleSetter";

const WebsiteDetailsPage = () => {
  const { websiteId } = useParams<{
    websiteId: string;
  }>();

  const { data: website } = useDocument("website", websiteId);

  usePageTitleSetter("website", website?.title, website?.url);

  if (!websiteId || !website) {
    return null;
  }

  const { thumbnail, description } = website;

  return (
    <ScrollContainer>
      <Thumbnail src={urlFor(thumbnail).url()} />
      <DetailsPageInfo document={website} />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["website"]} />
    </ScrollContainer>
  );
};

export default WebsiteDetailsPage;
