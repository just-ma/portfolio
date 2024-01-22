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

const Title = styled.a`
  flex-shrink: 0;
`;

const Subtitle = styled.div`
  display: flex;
  text-align: right;

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
  document: { title, shortDescription },
  url,
}: {
  document: DocumentDefinition;
  url: string;
}) => {
  return (
    <Container>
      <Title href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </Title>
      <Subtitle>
        <Description value={shortDescription} />
      </Subtitle>
    </Container>
  );
};

export default DetailsPageInfo;
