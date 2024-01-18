import type { PortableTextBlock } from "@portabletext/types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type DocumentType = "website" | "film" | "dj" | "photo" | "art";

type BaseDocumentDefiniion<T extends DocumentType> = {
  _type: T;
};

export type WebsiteDefiniion = BaseDocumentDefiniion<"website"> & {
  title: string;
  slug: {
    current: string;
  };
  shortDescription: PortableTextBlock;
  description: PortableTextBlock;
  url: string;
  timestamp: string;
  image: SanityImageSource;
};

type DocumentDefinition = WebsiteDefiniion;

interface DOCUMENT_TYPE_TO_DEFINITION
  extends Record<DocumentType, DocumentDefinition> {
  website: WebsiteDefiniion;
}

const PROJECT_ID = "ullgaoyt";
const DATASET = "production";
export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true,
  apiVersion: "2024-01-11",
});

const getDocumentsQuery = (type: DocumentType, slug?: string) =>
  `*[_type == "${type}"${
    slug ? ` && slug.current == "${slug}"` : ""
  }] | order(priority asc, timestamp desc)`;

export const getDocuments = async <T extends DocumentType>(
  type: T,
  slug?: string
): Promise<readonly DOCUMENT_TYPE_TO_DEFINITION[T][]> => {
  const response = await client.fetch(getDocumentsQuery(type, slug));
  return response;
};

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
