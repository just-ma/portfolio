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
  document: { title, shortDescription },
  url,
}: {
  document: DocumentDefinition;
  url: string;
}) => {
  return (
    <Container>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <Subtitle>
        <Description value={shortDescription} />
      </Subtitle>
    </Container>
  );
};

export default DetailsPageInfo;
