import { useQuery } from "@tanstack/react-query";
import { client, DocumentType } from "../sanity";
import { OPTION_TYPE_TO_ROOT_PATH } from "../constants";
import { queryClient } from "../App";

type ReferenceDefinition = {
  _id: string;
  _type: DocumentType;
  slug: {
    current: string;
  };
};

export default function useReferenceLink(reference: string) {
  const { data } = useQuery({
    queryKey: ["internalLink", reference],
    queryFn: async (): Promise<ReferenceDefinition | undefined> => {
      if (!reference) {
        return undefined;
      }

      const response = await client.fetch(
        `*[_id == "${reference}"]{ _id, _type, slug }`
      );
      return response?.[0];
    },
    initialData: (): ReferenceDefinition | undefined => {
      return queryClient
        .getQueryData<readonly ReferenceDefinition[]>(["internalLink"])
        ?.find((l) => l._id === reference);
    },
  });

  if (!data) {
    return null;
  }

  const rootPath = OPTION_TYPE_TO_ROOT_PATH[data._type];
  const slug = data.slug.current;

  if (!rootPath || !slug) {
    return null;
  }

  return `${rootPath}/${slug}`;
}
