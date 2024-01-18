import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../sanity";

const ImageBlockComponent = ({ value }: { value: SanityImageSource }) => {
  return <img src={urlFor(value).width(300).url()} alt="thumbnail" />;
};

export default ImageBlockComponent;
