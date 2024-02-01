import { PortableTextMarkComponentProps } from "@portabletext/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { client, DocumentType } from "../../sanity";
import { queryClient } from "../../App";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";

type ReferenceDefinition = {
  _id: string;
  _type: DocumentType;
  slug: {
    current: string;
  };
};

const ReferenceLink = ({
  ref,
  children,
}: {
  ref: string;
  children: string;
}) => {
  const { data } = useQuery({
    queryKey: ["internalLink", ref],
    queryFn: async (): Promise<ReferenceDefinition | undefined> => {
      if (!ref) {
        return undefined;
      }

      const response = await client.fetch(
        `*[_id == "${ref}"]{ _id, _type, slug }`
      );
      return response?.[0];
    },
    initialData: (): ReferenceDefinition | undefined => {
      return queryClient
        .getQueryData<readonly ReferenceDefinition[]>(["internalLink"])
        ?.find((l) => l._id === ref);
    },
  });

  if (!data) {
    return null;
  }

  return (
    <Link to={`${OPTION_TYPE_TO_ROOT_PATH[data._type]}/${data.slug.current}`}>
      {children}
    </Link>
  );
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
    return <ReferenceLink ref={reference._ref}>{text}</ReferenceLink>;
  }

  if (internal) {
    return <Link to={internal}>{text}</Link>;
  }
};

export default LinkBlockComponent;
