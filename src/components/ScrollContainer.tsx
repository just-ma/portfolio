import styled from "styled-components";
import useIsMobile from "../hooks/useMobile";

const ScrollColumn = styled.div<{ listPage?: boolean }>`
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ listPage }) => (listPage ? 50 : 15)}vh auto 0;
  gap: ${({ listPage }) => (listPage ? 60 : 10)}px;
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
}: {
  children: React.ReactNode;
  listPage?: boolean;
}) => {
  const isMobile = useIsMobile();

  return (
    <ScrollColumn listPage={listPage}>
      {children}
      {isMobile && listPage && (
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
