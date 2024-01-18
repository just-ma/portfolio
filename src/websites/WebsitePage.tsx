import styled from "styled-components";
import { WebsiteDefiniion, getDocuments, urlFor } from "../sanity";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../App";
import { PortableText } from "@portabletext/react";
import ImageBlockComponent from "../components/ImageBlockComponent";
import VideoBlockComponent from "../components/VideoBlockComponent";
import LinkBlockComponent from "../components/LinkBlockComponent";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";

const Image = styled.img`
  background-color: gray;
  border: 1px solid black;
  width: 600px;
  max-width: 100%;
  aspect-ratio: 1.78;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
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
  }

  :before {
    content: "( ";
  }

  :after {
    content: " )";
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const WebsitePage = () => {
  const { websiteId } = useParams<{
    websiteId: string;
  }>();

  const { data } = useQuery({
    queryKey: ["website", websiteId],
    queryFn: async () => {
      const data = await getDocuments("website", websiteId!);
      return data;
    },
    initialData: () => {
      return queryClient
        .getQueryData<readonly WebsiteDefiniion[]>(["website"])
        ?.filter((d) => d.slug.current === websiteId);
    },
  });

  if (!websiteId || !data?.length) {
    return null;
  }

  const [{ title, image, shortDescription, description, url }] = data;

  return (
    <ScrollContainer>
      <Image src={urlFor(image).url()}></Image>
      <Info>
        <Title href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </Title>
        <Subtitle>
          <PortableText value={shortDescription} />
        </Subtitle>
      </Info>
      <Content>
        <PortableText
          value={description}
          components={{
            types: {
              image: ImageBlockComponent,
              video: VideoBlockComponent,
            },
            marks: {
              link: LinkBlockComponent,
            },
          }}
        />
      </Content>
      <BackFooter defaultPath="/websites" />
    </ScrollContainer>
  );
};

export default WebsitePage;
