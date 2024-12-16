import { useQuery } from "@tanstack/react-query";
import { DocumentDefinition, DocumentType, getDocumentTitles } from "../sanity";

export default function usePrevNextDocuments<
  TDocumentType extends DocumentType
>(
  documentType: TDocumentType,
  documentId: string
): [null | DocumentDefinition, null | DocumentDefinition] {
  const { data } = useQuery({
    queryKey: [documentType],
    queryFn: async () => {
      const data = await getDocumentTitles(documentType);
      return data;
    },
  });

  if (!data) {
    return [null, null];
  }

  const index = data.findIndex((d) => d.slug.current === documentId);
  if (index === -1) {
    return [null, null];
  }

  const prev = index === 0 ? null : data[index - 1];
  const next = index === data.length - 1 ? null : data[index + 1];

  return [prev, next];
}
