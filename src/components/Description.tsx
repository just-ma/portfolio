import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import ImageBlockComponent from "./blocks/ImageBlockComponent";
import VideoBlockComponent from "./blocks/VideoBlockComponent";
import LinkBlockComponent from "./blocks/LinkBlockComponent";
import styled from "styled-components";
import CustomBlockComponent from "./blocks/CustomBlockComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const Description = ({ value }: { value: PortableTextBlock }) => {
  return (
    <Container>
      <PortableText
        value={value}
        components={{
          types: {
            image: ImageBlockComponent,
            video: VideoBlockComponent,
            custom: CustomBlockComponent,
          },
          marks: {
            link: LinkBlockComponent,
          },
        }}
      />
    </Container>
  );
};

export default Description;
