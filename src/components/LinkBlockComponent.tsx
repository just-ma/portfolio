import { Link } from "react-router-dom";
import { PortableTextMarkComponentProps } from "@portabletext/react";

const LinkBlockComponent = ({
  value,
  text,
}: PortableTextMarkComponentProps<{
  _type: "link";
  href: string;
  external: boolean;
}>) => {
  if (!value) {
    return null;
  }

  const { href, external } = value;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }

  return <Link to={value.href}>{text}</Link>;
};

export default LinkBlockComponent;
