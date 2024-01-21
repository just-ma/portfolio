import { Link } from "react-router-dom";
import { PortableTextMarkComponentProps } from "@portabletext/react";
import { DOCUMENT_TYPE_TO_ROOT_PATH, DocumentType, client } from "../../sanity";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";

type ReferenceDefinition = {
  _id: string;
  _type: DocumentType;
  slug: {
    current: string;
  };
};

const InternalLinkBlockComponent = ({
  value,
  text,
}: PortableTextMarkComponentProps<{
  _key: string;
  _ref: string;
  _type: "internalLink";
}>) => {
  const { data } = useQuery({
    queryKey: ["internalLink", value?._ref],
    queryFn: async (): Promise<ReferenceDefinition | undefined> => {
      if (!value) {
        return undefined;
      }

      const response = await client.fetch(
        `*[_id == "${value._ref}"]{ _id, _type, slug }`
      );
      return response?.[0];
    },
    initialData: (): ReferenceDefinition | undefined => {
      return queryClient
        .getQueryData<readonly ReferenceDefinition[]>(["internalLink"])
        ?.find((l) => l._id === value?._ref);
    },
  });

  if (!data) {
    return null;
  }

  return (
    <Link to={`${DOCUMENT_TYPE_TO_ROOT_PATH[data._type]}/${data.slug.current}`}>
      {text}
    </Link>
  );
};

export default InternalLinkBlockComponent;
