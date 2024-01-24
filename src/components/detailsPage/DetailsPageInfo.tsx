import styled from "styled-components";
import { DocumentDefinition } from "../../sanity";
import Description from "../Description";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-bottom: 50px;
`;

const Subtitle = styled.div`
  display: flex;
  text-align: right;

  p {
    margin: 0;
    height: fit-content;

    &::before {
      content: "(";
      margin-right: 7px;
    }

    &::after {
      content: ")";
      margin-left: 7px;
    }
  }
`;

const DetailsPageInfo = ({
  document,
  url,
}: {
  document: DocumentDefinition;
  url?: string;
}) => {
  return (
    <Container>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {document.title}
        </a>
      ) : (
        <div>{document.title}</div>
      )}
      <Subtitle>
        <Description value={document.shortDescription} />
      </Subtitle>
    </Container>
  );
};

export default DetailsPageInfo;
