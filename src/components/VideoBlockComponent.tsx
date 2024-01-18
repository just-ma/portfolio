import styled from "styled-components";

const Video = styled.iframe<{
  aspectRatio: number;
}>`
  width: 100%;
  max-height: 600px;
  border: none;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
`;

const VideoBlockComponent = ({
  value: { url, width, height, autoplay },
}: {
  value: { url: string; width: number; height: number; autoplay: boolean };
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
      aspectRatio={width / height}
      allow="autoplay; fullscreen; picture-in-picture"
    ></Video>
  );
};

export default VideoBlockComponent;
