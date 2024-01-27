import type { PortableTextBlock } from "@portabletext/types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type DocumentType = "website" | "film" | "dj" | "blog";

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
  hidden: boolean;
};

export type WebsiteDefinition = BaseDocumentDefiniion<"website"> & {
  url: string;
};

export type FilmDefinition = BaseDocumentDefiniion<"film"> & {
  video: {
    url: string;
    externalUrl: string;
    width: number;
    height: number;
  };
  quote: string;
};

export type DJDefinition = BaseDocumentDefiniion<"dj"> & {
  soundCloud: {
    id: string;
    externalUrl: string;
  };
};

export type BlogDefinition = BaseDocumentDefiniion<"blog">;

export type DocumentDefinition =
  | WebsiteDefinition
  | FilmDefinition
  | DJDefinition
  | BlogDefinition;

export type AboutType = "about";
export type AboutDefinition = {
  _type: AboutType;
  title: string;
  description: PortableTextBlock;
  order: number;
};

export type OptionType = DocumentType | AboutType;

export interface DocumentTypeToDefinition
  extends Record<DocumentType, DocumentDefinition> {
  website: WebsiteDefinition;
  film: FilmDefinition;
  dj: DJDefinition;
  blog: BlogDefinition;
}

const PROJECT_ID = "ullgaoyt";
const DATASET = "production";
export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true,
  apiVersion: "2024-01-11",
});

const getDocumentsQuery = (type?: DocumentType) =>
  `*[${
    type
      ? `_type == "${type}"`
      : '(_type == "website" || _type == "film" || _type == "dj" || _type == "blog") && slug.current != "__last__"'
  } && hidden != true]{
    ...,
    "description": null
  } | order(order asc, timestamp desc)`;

const getDocumentQuery = (type: DocumentType, slug: string) =>
  `*[_type == "${type}"${slug ? ` && slug.current == "${slug}"` : ""}]`;

export const getDocuments = async <T extends DocumentType>(
  type?: T
): Promise<readonly DocumentTypeToDefinition[T][]> => {
  const response = await client.fetch(getDocumentsQuery(type));
  return response;
};

export const getDocument = async <T extends DocumentType>(
  type: T,
  slug: string
): Promise<readonly DocumentTypeToDefinition[T][]> => {
  const response = await client.fetch(getDocumentQuery(type, slug));
  return response;
};

export const getAbout = async (
  count: number
): Promise<AboutDefinition | undefined> => {
  const response = await client.fetch(
    `*[_type == "about" && order == ${count}]`
  );
  return response?.[0];
};

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
