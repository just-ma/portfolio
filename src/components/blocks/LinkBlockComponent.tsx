import { PortableTextMarkComponentProps } from "@portabletext/react";
import { Link } from "react-router-dom";
import useReferenceLink from "../../hooks/useReferenceLink";

const ReferenceLink = ({
  reference,
  children,
}: {
  reference: string;
  children: string;
}) => {
  const referenceLink = useReferenceLink(reference);

  if (!referenceLink) {
    return null;
  }

  return <Link to={referenceLink}>{children}</Link>;
};

const LinkBlockComponent = ({
  value,
  text,
}: PortableTextMarkComponentProps<{
  _type: "link";
  href?: string;
  reference?: {
    _ref: string;
    _type: "reference";
  };
  internal?: string;
  external?: string;
}>) => {
  if (!value) {
    return null;
  }

  const { href, reference, internal, external } = value;

  if (href || external) {
    return (
      <a href={href || external} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }

  if (reference) {
    return <ReferenceLink reference={reference._ref}>{text}</ReferenceLink>;
  }

  if (internal) {
    return <Link to={internal}>{text}</Link>;
  }
};

export default LinkBlockComponent;
