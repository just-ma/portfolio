import styled from "styled-components";

const Video = styled.iframe<{ aspectRatio: number }>`
  width: 100%;
  max-height: 600px;
  border: none;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
`;

const VideoBlockComponent = ({
  value: { url, width, height },
}: {
  value: { url: string; width: number; height: number };
}) => {
  return (
    <Video
      src={url}
      title={url}
      aspectRatio={width / height}
      allow="autoplay"
    ></Video>
  );
};

export default VideoBlockComponent;
