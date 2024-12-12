import styled from "styled-components";
import { MEDIA_SIZE } from "../../constants";

const Video = styled.iframe<{
  aspectratio: number;
}>`
  width: 100%;
  max-height: max(50vh, 600px);
  border: none;
  aspect-ratio: ${({ aspectratio }) => aspectratio};

  @media ${MEDIA_SIZE.mobile} {
    max-height: 400px;
  }
`;

const VideoBlockComponent = ({
  value: { url, width, height, autoplay },
  className,
}: {
  value: { url: string; width: number; height: number; autoplay?: boolean };
  className?: string;
}) => {
  const src = autoplay
    ? `${url}${
        url.includes("?") ? "&" : "?"
      }autoplay=1&muted=1&autopause=0&loop=1`
    : url;

  return (
    <Video
      src={src}
      title={url}
      aspectratio={width / height}
      allow="autoplay; fullscreen; picture-in-picture"
      className={className}
    />
  );
};

export default VideoBlockComponent;
