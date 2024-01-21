import type { PortableTextBlock } from "@portabletext/types";
import Description from "../Description";
import FloatingText from "../FloatingText";
import styled from "styled-components";

const Container = styled.div<{ square?: boolean }>`
  width: ${({ square }) => (square ? 180 : 300)}px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Box = styled.div<{ square?: boolean }>`
  border: 1px solid black;
  width: 100%;
  height: ${({ square }) => (square ? 180 : 169)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const Text = styled(FloatingText)<{ shift?: number }>`
  transform: translate(${({ shift }) => shift || 0}px, 0);
  margin-bottom: 20px;
`;

const ComingSoonCard = ({
  square,
  description,
}: {
  square?: boolean;
  description: PortableTextBlock;
}) => {
  return (
    <Container square={square}>
      <Box square={square}>
        <Text shift={-30}>more</Text>
        <Text>coming</Text>
        <Text shift={30}>soon...</Text>
      </Box>
      <Description value={description} />
    </Container>
  );
};

export default ComingSoonCard;
