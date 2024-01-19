import styled from "styled-components";
import { DocumentDefinition } from "../sanity";
import { PortableText } from "@portabletext/react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-bottom: 50px;
`;

const Title = styled.a`
  font-size: 16px;
  flex-shrink: 0;
  line-height: 20px;
  color: black;
`;

const Subtitle = styled.div`
  font-size: 16px;
  display: flex;
  text-align: right;
  line-height: 20px;

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

const DetailsPageInfo = ({
  document: { url, title, shortDescription },
}: {
  document: DocumentDefinition;
}) => {
  return (
    <Container>
      <Title href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </Title>
      <Subtitle>
        <PortableText value={shortDescription} />
      </Subtitle>
    </Container>
  );
};

export default DetailsPageInfo;
