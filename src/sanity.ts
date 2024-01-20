import type { PortableTextBlock } from "@portabletext/types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type DocumentType = "website" | "film" | "dj" | "photo";

type BaseDocumentDefiniion<T extends DocumentType> = {
  _type: T;
  title: string;
  slug: {
    current: string;
  };
  shortDescription: PortableTextBlock;
  description: PortableTextBlock;
  timestamp: string;
  thumbnail: SanityImageSource;
  order: number;
};

export type WebsiteDefinition = BaseDocumentDefiniion<"website"> & {
  url: string;
};

export type FilmDefinition = BaseDocumentDefiniion<"film"> & {
  video: {
    url: string;
    width: number;
    height: number;
  };
  quote: string;
  url: string;
};

export type DJDefinition = BaseDocumentDefiniion<"dj"> & {
  video?: {
    url: string;
    width: number;
    height: number;
  };
  videoUrl?: string;
  soundcloudUrl: string;
};

export type AboutDefinition = {
  _type: "about";
  description: PortableTextBlock;
};

export type DocumentDefinition = WebsiteDefinition | FilmDefinition;

export interface DocumentTypeToDefinition
  extends Record<DocumentType, DocumentDefinition> {
  website: WebsiteDefinition;
  film: FilmDefinition;
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
  }] | order(order asc, timestamp desc)`;

export const getDocuments = async <T extends DocumentType>(
  type: T,
  slug?: string
): Promise<readonly DocumentTypeToDefinition[T][]> => {
  const response = await client.fetch(getDocumentsQuery(type, slug));
  return response;
};

export const getAbout = async (): Promise<AboutDefinition | undefined> => {
  const response = await client.fetch('*[_type == "about"]');
  return response?.[0];
};

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
