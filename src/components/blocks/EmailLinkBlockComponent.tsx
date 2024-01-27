import { PortableTextMarkComponentProps } from "@portabletext/react";

const EmailLinkBlockComponent = ({
  value,
  text,
}: PortableTextMarkComponentProps<{
  _type: "emailLink";
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

export default EmailLinkBlockComponent;
