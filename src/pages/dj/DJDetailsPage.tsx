import { useParams } from "react-router-dom";
import BackFooter from "../../components/BackFooter";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import SoundCloudEmbed from "./SoundCloudEmbed";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import DividedPage from "../../components/DividedPage";

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
    <DividedPage withDot>
      <SoundCloudEmbed soundCloudId={soundCloud.id} />
      <DetailsPageInfo document={dj} url={soundCloud.externalUrl} />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["dj"]} />
    </DividedPage>
  );
};

export default DJDetailsPage;
