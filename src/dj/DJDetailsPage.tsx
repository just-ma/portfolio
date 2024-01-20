import { useParams } from "react-router-dom";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import DetailsPageInfo from "../components/DetailsPageInfo";
import DetailsPageDescription from "../components/DetailsPageDescription";
import useDocument from "../hooks/useDocument";
import { DOCUMENT_TYPE_TO_ROOT_PATH } from "../sanity";
import SoundCloudEmbed from "./SoundCloudEmbed";

const DJDetailsPage = () => {
  const { djId } = useParams<{
    djId: string;
  }>();

  const { data: dj } = useDocument("dj", djId);

  if (!djId || !dj) {
    return null;
  }

  const { description, soundCloud } = dj;

  return (
    <ScrollContainer>
      <SoundCloudEmbed soundCloudId={soundCloud.id} />
      <DetailsPageInfo document={dj} url={soundCloud.url} />
      <DetailsPageDescription value={description} />
      <BackFooter defaultPath={DOCUMENT_TYPE_TO_ROOT_PATH["dj"]} />
    </ScrollContainer>
  );
};

export default DJDetailsPage;
