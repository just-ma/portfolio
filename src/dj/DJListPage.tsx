import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import useDocuments from "../hooks/useDocuments";
import FloatingText from "../components/FloatingText";
import styled from "styled-components";
import ListPageCardContainer from "../components/ListPageCardContainer";
import HorizonatalThumbnail from "../components/HorizonatalThumbnail";
import { urlFor } from "../sanity";
import { PortableText } from "@portabletext/react";

const Card = styled(ListPageCardContainer)`
  width: 180px !important;
`;

const Thumbnail = styled(HorizonatalThumbnail)`
  aspect-ratio: 1;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  width: 100%;
`;

const Title = styled.div`
  flex-shrink: 0;
  text-decoration: underline;
`;

const Subtitle = styled.div`
  p {
    margin: 0;
    height: fit-content;

    &::before {
      content: "( ";
    }

    &::after {
      content: " )";
    }
  }
`;

const ComingSoonText = styled(FloatingText)`
  margin-top: 20%;
`;

const DJsPage = () => {
  const { data } = useDocuments("dj");

  return (
    <ScrollContainer gap={60}>
      {data?.map((dj, index) => (
        <Card key={dj.slug.current} index={index} document={dj} rootPath="dj">
          <Thumbnail src={urlFor(dj.thumbnail).width(300).url()} />
          <Info>
            <Title>{dj.title}</Title>
            <Subtitle>
              <PortableText value={dj.shortDescription} />
            </Subtitle>
          </Info>
        </Card>
      ))}
      <ComingSoonText>more coming soon...</ComingSoonText>
      <BackFooter />
    </ScrollContainer>
  );
};

export default DJsPage;
