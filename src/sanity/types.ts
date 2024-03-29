import type { PortableTextBlock } from "@portabletext/types";
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

/* misc */

export type AppleMurdererPageType = "appleMurdererPage";
export type AppleMurdererOptionDefinition = {
  pageNum: number | undefined;
  description: PortableTextBlock;
};
export type AppleMurdererPageDefinition = {
  _type: AppleMurdererPageType;
  title: string;
  pageNum: number;
  description?: PortableTextBlock;
  options?: readonly AppleMurdererOptionDefinition[];
};
