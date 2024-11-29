import styled from "styled-components";
import { MEDIA_SIZE } from "../constants";
import { DescriptionContainer } from "./Description";
import { Dot } from "./Dot";
import { useEffect } from "react";

export const PAGE_LEFT_OFFSET_PX = 230;
const MOBILE_PAGE_LEFT_OFFSER_PX = 28;

export const Container = styled.div`
  width: 100vw;
  display: flex;
`;

export const PageLeftContainer = styled.div`
  flex: 1 0 calc(50vw - ${PAGE_LEFT_OFFSET_PX}px);
  min-width: 190px;
  border-right: 1px solid blue;
  position: relative;
  pointer-events: all;

  @media ${MEDIA_SIZE.mobile} {
    flex: 0 0 ${MOBILE_PAGE_LEFT_OFFSER_PX}px;
    padding: 0;
    min-width: auto;
  }
`;

export const PageRightContainer = styled.div`
  flex: 1 1 calc(50vw + ${PAGE_LEFT_OFFSET_PX}px);
  padding-bottom: 70px;
  position: relative;
  pointer-events: all;

  @media ${MEDIA_SIZE.mobile} {
    flex: 1 0 calc(100vw - ${MOBILE_PAGE_LEFT_OFFSER_PX}px);
    padding-bottom: 40px;
  }

  ${DescriptionContainer} {
    margin: 0 50px;
    max-width: 600px;

    @media ${MEDIA_SIZE.mobile} {
      margin: 0 20px;
    }
  }
`;

export default function DividedPage({
  children,
  className,
  withDot,
}: {
  children: React.ReactNode;
  className?: string;
  withDot?: boolean;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Container className={className}>
      <PageLeftContainer>{withDot && <Dot />}</PageLeftContainer>
      <PageRightContainer>{children}</PageRightContainer>
    </Container>
  );
}
