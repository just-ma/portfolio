import { DocumentType } from "./sanity";

export type OptionDefinition = {
  type: DocumentType | "about";
  label: string;
  path: string;
};
