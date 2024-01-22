import styled from "styled-components";
import useAppContext from "../hooks/useAppContext";

const Page = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Scroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 150px 10px 0;
  box-sizing: border-box;
`;

const ScrollColumn = styled.div<{ gap?: number }>`
  width: 100%;
  max-width: 600px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ gap }) => gap}px;
  margin: 0 auto;
  box-sizing: border-box;
  animation: fillIn 0s 0.3s forwards;

  @keyframes fillIn {
    from {
      background-color: transparent;
    }
    to {
      background-color: white;
    }
  }
`;

const ScrollContainer = ({
  children,
  gap = 10,
}: {
  children: React.ReactNode;
  gap?: number;
}) => {
  const { scrollContainerRef } = useAppContext();

  return (
    <Page>
      <Scroll ref={scrollContainerRef}>
        <ScrollColumn gap={gap}>{children}</ScrollColumn>
      </Scroll>
    </Page>
  );
};

export default ScrollContainer;
