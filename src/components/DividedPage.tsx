import styled from "styled-components";
import { MEDIA_SIZE } from "../constants";
import { DescriptionContainer } from "./Description";
import { Dot } from "./Dot";
import { useEffect } from "react";
import useIsMobile from "../hooks/useMobile";
import { useLocation } from "react-router-dom";

export const PAGE_LEFT_OFFSET_PX = 230;
export const CONTENT_MAX_WIDTH_PX = 700;

export const Container = styled.div`
  width: 100vw;
  display: flex;
`;

export const PageLeftContainer = styled.div`
  flex: 0 0 calc(50vw - ${PAGE_LEFT_OFFSET_PX}px);
  min-width: 190px;
  border-right: 1px solid blue;
  position: relative;
  pointer-events: all;

  @media ${MEDIA_SIZE.mobile} {
    display: none;
  }
`;

export const PageRightContainer = styled.div`
  flex: 0 0 calc(50vw + ${PAGE_LEFT_OFFSET_PX}px);
  max-width: ${CONTENT_MAX_WIDTH_PX}px;
  padding-bottom: 70px;
  position: relative;
  pointer-events: all;

  @media ${MEDIA_SIZE.mobile} {
    flex: 1 0 100vw;
    padding-bottom: 40px;
  }

  ${DescriptionContainer} {
    padding: 0 50px;
    box-sizing: border-box;

    @media ${MEDIA_SIZE.mobile} {
      padding: 0 20px;
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
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <Container className={className}>
      <PageLeftContainer>{withDot && !isMobile && <Dot />}</PageLeftContainer>
      <PageRightContainer>{children}</PageRightContainer>
    </Container>
  );
}
