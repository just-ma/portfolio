import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  DocumentType,
  DocumentTypeToDefinition,
  getDocuments,
} from "../sanity";
import { queryClient } from "../App";

const useDocument = <TDocumentType extends DocumentType>(
  documentType: TDocumentType,
  documentId?: string
): UseQueryResult<DocumentTypeToDefinition[TDocumentType]> => {
  return useQuery({
    queryKey: [documentType, documentId],
    queryFn: async () => {
      if (!documentId) {
        return undefined;
      }

      const data = await getDocuments(documentType, documentId);
      return data?.[0];
    },
    initialData: () => {
      return queryClient
        .getQueryData<readonly DocumentTypeToDefinition[TDocumentType][]>([
          documentType,
        ])
        ?.find((d) => d.slug.current === documentId);
    },
  });
};

export default useDocument;
