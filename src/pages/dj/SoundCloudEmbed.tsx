import styled from "styled-components";

const Embed = styled.iframe`
  border: none;
  max-width: 100%;
  height: 50vh;
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
