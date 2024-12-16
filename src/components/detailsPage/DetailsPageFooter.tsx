import styled from "styled-components";
import { Link } from "react-router-dom";
import usePrevNextDocuments from "../../hooks/usePrevNextDocuments";
import { DocumentType } from "../../sanity";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";

const Container = styled.div`
  margin-top: 200px;
  margin-bottom: 100px;
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
`;

const Left = styled.div`
  width: 50%;
  margin-right: auto;
  text-align: right;
  margin-bottom: 50px;
`;

const Right = styled.div`
  width: 50%;
  margin-left: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  user-select: none;
`;

const Title = styled.h1``;

export default function DetailsPageFooter({
  id,
  type,
}: {
  id: string;
  type: DocumentType;
}) {
  const [prevDocument, nextDocument] = usePrevNextDocuments(type, id);

  return (
    <Container>
      {prevDocument && (
        <Left>
          <StyledLink
            to={`${OPTION_TYPE_TO_ROOT_PATH[type]}/${prevDocument.slug.current}`}
          >
            {"< prev"}
            <Title>{prevDocument.title}</Title>
          </StyledLink>
        </Left>
      )}
      {nextDocument && (
        <Right>
          <StyledLink
            to={`${OPTION_TYPE_TO_ROOT_PATH[type]}/${nextDocument.slug.current}`}
          >
            {"next >"}
            <Title>{nextDocument.title}</Title>
          </StyledLink>
        </Right>
      )}
    </Container>
  );
}
