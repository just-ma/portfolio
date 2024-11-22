import styled from "styled-components";

const Video = styled.iframe<{
  aspectratio: number;
}>`
  max-width: 100%;
  height: 100%;
  max-height: 50vh;
  border: none;
  aspect-ratio: ${({ aspectratio }) => aspectratio};
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
