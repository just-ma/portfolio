import styled, { css } from "styled-components";
import { getDocuments } from "../sanity";
import { useQuery } from "@tanstack/react-query";
import WebsitesPageCard from "./WebsitesPageCard";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";

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
    <ScrollContainer gap={60}>
      {data?.map((website, index) => (
        <CardPosition
          align={index % 4 < 2 ? "right" : "left"}
          shift={30 * ((index + 2) % 3)}
        >
          <WebsitesPageCard key={website.slug.current} website={website} />
        </CardPosition>
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default WebsitesPage;
