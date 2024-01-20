import { PortableTextMarkComponentProps } from "@portabletext/react";

const LinkBlockComponent = ({
  value,
  text,
}: PortableTextMarkComponentProps<{
  _type: "link";
  href: string;
}>) => {
  if (!value) {
    return null;
  }

  const { href } = value;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default LinkBlockComponent;
