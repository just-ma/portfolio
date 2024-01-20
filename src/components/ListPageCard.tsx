import { PortableText } from "@portabletext/react";
import styled from "styled-components";
import { DocumentDefinition, urlFor } from "../sanity";
import HorizonatalThumbnail from "./HorizonatalThumbnail";
import ListPageCardContainer from "./ListPageCardContainer";

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const Title = styled.div`
  flex-shrink: 0;
  text-decoration: underline;
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

const ListPageCard = (props: {
  document: DocumentDefinition;
  children?: React.ReactNode;
  rootPath: string;
  index: number;
}) => {
  const {
    document: { title, shortDescription, thumbnail },
    children,
  } = props;

  return (
    <ListPageCardContainer {...props}>
      <HorizonatalThumbnail src={urlFor(thumbnail).width(300).url()} />
      <Info>
        <Title>{title}</Title>
        <Subtitle>
          <PortableText value={shortDescription} />
        </Subtitle>
      </Info>
      {children}
    </ListPageCardContainer>
  );
};

export default ListPageCard;
