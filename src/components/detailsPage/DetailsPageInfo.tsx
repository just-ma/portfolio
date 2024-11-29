import styled from "styled-components";
import { DocumentDefinition } from "../../sanity";
import Description from "../Description";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  margin-bottom: 30px;
  margin-top: 20px;
`;

const Title = styled.h1`
  margin-left: 20px;
`;

const Subtitle = styled.h2``;

const DetailsPageInfo = ({
  document,
  url,
  className,
}: {
  document: DocumentDefinition;
  url?: string;
  className?: string;
}) => {
  return (
    <Container className={className}>
      <Title>{document.title}</Title>
      <Subtitle>
        <Description value={document.shortDescription} />
      </Subtitle>
    </Container>
  );
};

export default DetailsPageInfo;
