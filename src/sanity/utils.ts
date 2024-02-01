import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  AboutDefinition,
  DocumentType,
  DocumentTypeToDefinition,
} from "./types";
import { client } from "./constants";

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

export const getDocuments = async <TDocumentType extends DocumentType>(
  type?: TDocumentType
): Promise<readonly DocumentTypeToDefinition[TDocumentType][]> => {
  const response = await client.fetch(getDocumentsQuery(type));
  return response;
};

export const getDocument = async <TDocumentType extends DocumentType>(
  type: TDocumentType,
  slug: string
): Promise<readonly DocumentTypeToDefinition[TDocumentType][]> => {
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
