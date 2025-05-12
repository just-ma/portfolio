import { useParams } from "react-router-dom";
import DetailsPageFooter from "../../components/detailsPage/DetailsPageFooter";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import SoundCloudEmbed from "./SoundCloudEmbed";
import DividedPage from "../../components/DividedPage";
import { Helmet } from "react-helmet";
import { OPTION_TYPE_TO_LABEL } from "../../constants";

const getLinkLabel = (url: string) => {
  if (url.includes("soundcloud.com")) {
    return "listen on soundcloud";
  }

  return "watch on youtube";
};

const DJDetailsPage = () => {
  const { djId } = useParams<{
    djId: string;
  }>();

  const { data: dj } = useDocument("dj", djId);

  if (!djId || !dj?.description) {
    return null;
  }

  const { description, soundCloud, links, title } = dj;

  return (
    <>
      <Helmet>
        <title>{`${OPTION_TYPE_TO_LABEL["dj"]} — "${title}"`}</title>
      </Helmet>
      <DividedPage withDot>
        <SoundCloudEmbed soundCloudId={soundCloud?.id} />
        <DetailsPageInfo
          document={dj}
          links={links}
          getLinkLabel={getLinkLabel}
        />
        <Description value={description} />
        <DetailsPageFooter id={djId} type="dj" />
      </DividedPage>
    </>
  );
};

export default DJDetailsPage;
