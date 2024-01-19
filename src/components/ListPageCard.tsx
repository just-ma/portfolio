import { PortableText } from "@portabletext/react";
import styled, { css } from "styled-components";
import { DocumentDefinition, urlFor } from "../sanity";
import { useNavigate } from "react-router-dom";

const CardPosition = styled.div<{ align: string; shift: number }>`
  ${({ align, shift }) =>
    align === "left"
      ? css`
          margin-left: auto;
          padding-right: min(${shift}px, calc(100% - 300px));
        `
      : css`
          margin-right: auto;
          padding-left: min(${shift}px, calc(100% - 300px));
        `};
`;

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  cursor: pointer;
`;

const Image = styled.img`
  background-color: gray;
  width: 300px;
  aspect-ratio: 1.78;
  border: 1px solid black;
  box-sizing: border-box;
`;

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

const ListPageCard = ({
  document: { title, shortDescription, slug, thumbnail },
  children,
  rootPath,
  index,
}: {
  document: DocumentDefinition;
  children?: React.ReactNode;
  rootPath: string;
  index: number;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${rootPath}/${slug.current}`);
  };

  return (
    <CardPosition
      align={index % 4 < 2 ? "right" : "left"}
      shift={30 * ((index + 2) % 3)}
    >
      <Card onClick={handleClick}>
        <Image src={urlFor(thumbnail).width(300).url()}></Image>
        <Info>
          <Title>{title}</Title>
          <Subtitle>
            <PortableText value={shortDescription} />
          </Subtitle>
        </Info>
        {children}
      </Card>
    </CardPosition>
  );
};

export default ListPageCard;
