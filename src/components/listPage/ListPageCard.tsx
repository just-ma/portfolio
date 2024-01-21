import styled, { css } from "styled-components";
import { DocumentDefinition, urlFor } from "../../sanity";
import Thumbnail from "../Thumbnail";
import ListPageCardContainer from "./ListPageCardContainer";
import Description from "../Description";
import ComingSoonCard from "./ComingSoonCard";

const Info = styled.div<{ square?: boolean }>`
  display: flex;
  width: 100%;
  gap: 10px;

  ${({ square }) =>
    square
      ? css`
          flex-direction: column;
          text-align: left;
        `
      : css`
          justify-content: space-between;
        `}
`;

const Title = styled.div`
  flex-shrink: 0;
  text-decoration: underline;
`;

const Subtitle = styled.div<{ square?: boolean }>`
  display: flex;

  ${({ square }) =>
    !square &&
    css`
      text-align: right;
    `}

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

const ListPageCard = (props: {
  document: DocumentDefinition;
  children?: React.ReactNode;
  index: number;
  square?: boolean;
}) => {
  const {
    document: { slug, title, shortDescription, thumbnail },
    children,
    square,
  } = props;

  if (slug.current === "__last__") {
    return <ComingSoonCard description={shortDescription} square={square} />;
  }

  return (
    <ListPageCardContainer {...props}>
      <Thumbnail src={urlFor(thumbnail).width(300).url()} square={square} />
      <Info square={square}>
        <Title>{title}</Title>
        <Subtitle square={square}>
          <Description value={shortDescription} />
        </Subtitle>
      </Info>
      {children}
    </ListPageCardContainer>
  );
};

export default ListPageCard;