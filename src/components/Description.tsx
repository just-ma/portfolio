import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import ImageBlockComponent from "./blocks/ImageBlockComponent";
import VideoBlockComponent from "./blocks/VideoBlockComponent";
import LinkBlockComponent from "./blocks/LinkBlockComponent";
import styled from "styled-components";
import CustomBlockComponent from "./blocks/CustomBlockComponent";

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -0.2px;
`;

const Description = ({
  value,
  className,
}: {
  value: PortableTextBlock;
  className?: string;
}) => {
  return (
    <DescriptionContainer className={className}>
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
    </DescriptionContainer>
  );
};

export default Description;
