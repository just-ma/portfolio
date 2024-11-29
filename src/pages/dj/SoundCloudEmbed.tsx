import styled from "styled-components";
import { CONTENT_MAX_WIDTH_PX } from "../../components/DividedPage";

const Embed = styled.iframe`
  border: none;
  width: 100%;
  max-width: ${CONTENT_MAX_WIDTH_PX}px;
  aspect-ratio: 1.78;
  background-color: white;
  border: 1px black solid;
`;

const SoundCloudEmbed = ({ soundCloudId }: { soundCloudId: string }) => {
  return (
    <Embed
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundCloudId}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
    />
  );
};

export default SoundCloudEmbed;
