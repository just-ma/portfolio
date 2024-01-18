import styled, { css } from "styled-components";
import { getDocuments } from "../sanity";
import { useQuery } from "@tanstack/react-query";
import WebsitesPageCard from "./WebsitesPageCard";

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
  padding: 150px 10px 40%;
  box-sizing: border-box;
`;

const ScrollColumn = styled.div`
  max-width: 600px;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin: 0 auto;
`;

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

const WebsitesPage = () => {
  const { data } = useQuery({
    queryKey: ["website"],
    queryFn: async () => {
      const data = await getDocuments("website");
      return data;
    },
  });

  return (
    <Page>
      <ScrollContainer>
        <ScrollColumn>
          {data?.map((website, index) => (
            <CardPosition
              align={index % 4 < 2 ? "right" : "left"}
              shift={30 * ((index + 2) % 3)}
            >
              <WebsitesPageCard key={website.slug.current} website={website} />
            </CardPosition>
          ))}
        </ScrollColumn>
      </ScrollContainer>
    </Page>
  );
};

export default WebsitesPage;
