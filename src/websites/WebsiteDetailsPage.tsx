import { DOCUMENT_TYPE_TO_ROOT_PATH, urlFor } from "../sanity";
import { useParams } from "react-router-dom";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import DetailsPageDescription from "../components/DetailsPageDescription";
import DetailsPageInfo from "../components/DetailsPageInfo";
import useDocument from "../hooks/useDocument";
import HorizonatalThumbnail from "../components/HorizonatalThumbnail";

const WebsiteDetailsPage = () => {
  const { websiteId } = useParams<{
    websiteId: string;
  }>();

  const { data: website } = useDocument("website", websiteId);

  if (!websiteId || !website) {
    return null;
  }

  const { thumbnail, description, url } = website;

  return (
    <ScrollContainer>
      <HorizonatalThumbnail src={urlFor(thumbnail).url()} />
      <DetailsPageInfo document={website} url={url} />
      <DetailsPageDescription value={description} />
      <BackFooter defaultPath={DOCUMENT_TYPE_TO_ROOT_PATH["website"]} />
    </ScrollContainer>
  );
};

export default WebsiteDetailsPage;
