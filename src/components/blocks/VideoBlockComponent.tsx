import styled from "styled-components";
import { MEDIA_SIZE } from "../../constants";

const Video = styled.iframe<{
  aspectratio: number;
}>`
  /* width: min(100%, 700px);
  max-height: max(50vh, 400px); */
  max-width: 100%;
  height: 100%;
  /* max-height: 50vh; */
  max-height: 600px;
  border: none;
  aspect-ratio: ${({ aspectratio }) => aspectratio};

  @media ${MEDIA_SIZE.mobile} {
    max-height: 400px;
  }
`;

const VideoBlockComponent = ({
  value: { url, width, height, autoplay },
}: {
  value: { url: string; width: number; height: number; autoplay?: boolean };
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
    ></Video>
  );
};

export default VideoBlockComponent;
