import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import ImageBlockComponent from "./ImageBlockComponent";
import VideoBlockComponent from "./VideoBlockComponent";
import LinkBlockComponent from "./LinkBlockComponent";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const DetailsPageDescription = ({ value }: { value: PortableTextBlock }) => {
  return (
    <Container>
      <PortableText
        value={value}
        components={{
          types: {
            image: ImageBlockComponent,
            video: VideoBlockComponent,
          },
          marks: {
            link: LinkBlockComponent,
          },
        }}
      />
    </Container>
  );
};

export default DetailsPageDescription;