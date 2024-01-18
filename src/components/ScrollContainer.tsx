import styled from "styled-components";

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
  background-color: white;
`;

const ScrollContainer = ({
  children,
  gap = 10,
}: {
  children: React.ReactNode;
  gap?: number;
}) => {
  return (
    <Page>
      <Scroll>
        <ScrollColumn gap={gap}>{children}</ScrollColumn>
      </Scroll>
    </Page>
  );
};

export default ScrollContainer;
