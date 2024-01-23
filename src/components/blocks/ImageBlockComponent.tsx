import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity";
import styled from "styled-components";

const Image = styled.img`
  max-height: 600px;
  max-width: 100%;
  align-self: center;
`;

const ImageBlockComponent = ({ value }: { value: SanityImageSource }) => {
  return <Image src={urlFor(value).url()} alt="thumbnail" />;
};

export default ImageBlockComponent;
