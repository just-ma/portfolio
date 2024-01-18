import { PortableText } from "@portabletext/react";
import styled from "styled-components";
import { WebsiteDefiniion, urlFor } from "../sanity";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
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
  gap: 20px;
`;

const Title = styled.div`
  font-size: 14px;
  flex-shrink: 0;
  line-height: 20px;
  text-decoration: underline;
`;

const Subtitle = styled.div`
  font-size: 14px;
  display: flex;
  text-align: right;
  line-height: 20px;

  p {
    margin: 0;
    height: fit-content;
  }

  :before {
    content: "( ";
  }

  :after {
    content: " )";
  }
`;

const WebsitesPageCard = ({
  website: { title, shortDescription, url, slug, image },
}: {
  website: WebsiteDefiniion;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/websites/${slug.current}`);
  };

  return (
    <Container onClick={handleClick}>
      <Image src={urlFor(image).width(300).url()}></Image>
      <Info>
        <Title>{title}</Title>
        <Subtitle>
          <PortableText value={shortDescription} />
        </Subtitle>
      </Info>
    </Container>
  );
};

export default WebsitesPageCard;
