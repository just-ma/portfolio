import styled from "styled-components";
import useIsMobile from "../hooks/useMobile";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { INITIAL_VIEWPORT_HEIGHT } from "../constants";

const ScrollColumn = styled.div<{ $listPage?: boolean }>`
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ $listPage }) =>
      ($listPage ? 0.5 : 0.15) * INITIAL_VIEWPORT_HEIGHT}px
    auto 0;
  gap: ${({ $listPage }) => ($listPage ? 60 : 10)}px;
  padding: 0 10px 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const ListPageMobileBorder = styled.div<{
  position: "top" | "bottom" | "left" | "right";
}>`
  position: absolute;
  top: ${({ position }) => (position !== "bottom" ? 0 : 31)}vh;
  left: ${({ position }) => (position !== "right" ? 0 : 80)}vw;
  width: ${({ position }) =>
    position === "top" || position === "bottom" ? 100 : 20}vw;
  height: ${({ position }) =>
    position === "top" ? 10 : position === "bottom" ? 19 : 50}vh;
`;

const ScrollContainer = ({
  children,
  listPage,
  className,
}: {
  children: React.ReactNode;
  listPage?: boolean;
  className?: string;
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/all";

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isHome) {
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <ScrollColumn $listPage={listPage} className={className}>
      {children}
      {isMobile && listPage && !isHome && (
        <>
          <ListPageMobileBorder position="top" />
          <ListPageMobileBorder position="left" />
          <ListPageMobileBorder position="bottom" />
          <ListPageMobileBorder position="right" />
        </>
      )}
    </ScrollColumn>
  );
};

export default ScrollContainer;
