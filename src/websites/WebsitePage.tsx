import styled from "styled-components";
import { WebsiteDefiniion, getDocuments, urlFor } from "../sanity";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../App";
import { PortableText } from "@portabletext/react";
import ImageBlockComponent from "../components/ImageBlockComponent";
import VideoBlockComponent from "../components/VideoBlockComponent copy";
import LinkBlockComponent from "../components/LinkBlockComponent";

const Page = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding-top: 150px;
  box-sizing: border-box;
`;

const ScrollColumn = styled.div`
  max-width: 600px;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box;
`;

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

const Back = styled.div`
  margin: 40% 0;
  cursor: pointer;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const WebsitePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const navigateBack = () => {
    if (location.key === "default") {
      navigate("/websites");
      return;
    }

    navigate(-1);
  };

  if (!websiteId || !data?.length) {
    return null;
  }

  const [{ title, image, shortDescription, description, url }] = data;

  return (
    <Page>
      <ScrollContainer>
        <ScrollColumn>
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
          <Back onClick={navigateBack}>
            {"<-- "}
            <Underline>back</Underline>
          </Back>
        </ScrollColumn>
      </ScrollContainer>
    </Page>
  );
};

export default WebsitePage;
