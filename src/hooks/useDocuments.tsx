import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  DocumentType,
  DocumentTypeToDefinition,
  getDocuments,
} from "../sanity";

const useDocuments = <TDocumentType extends DocumentType>(
  documentType: TDocumentType
): UseQueryResult<readonly DocumentTypeToDefinition[TDocumentType][]> => {
  return useQuery({
    queryKey: [documentType],
    queryFn: async () => {
      const data = await getDocuments(documentType);
      return data;
    },
  });
};

export default useDocuments;
