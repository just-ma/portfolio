import styled from "styled-components";
import { urlFor } from "../sanity";
import { useParams } from "react-router-dom";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import DetailsPageDescription from "../components/DetailsPageDescription";
import DetailsPageInfo from "../components/DetailsPageInfo";
import useDocument from "../hooks/useDocument";

const Image = styled.img`
  background-color: gray;
  border: 1px solid black;
  width: 600px;
  max-width: 100%;
  aspect-ratio: 1.78;
  box-sizing: border-box;
`;

const WebsiteDetailsPage = () => {
  const { websiteId } = useParams<{
    websiteId: string;
  }>();

  const { data: website } = useDocument("website", websiteId);

  if (!websiteId || !website) {
    return null;
  }

  const { thumbnail, description } = website;

  return (
    <ScrollContainer>
      <Image src={urlFor(thumbnail).url()}></Image>
      <DetailsPageInfo document={website} />
      <DetailsPageDescription value={description} />
      <BackFooter defaultPath="/websites" />
    </ScrollContainer>
  );
};

export default WebsiteDetailsPage;
