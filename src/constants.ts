import { DOCUMENT_TYPE_TO_ROOT_PATH } from "./sanity";
import { OptionDefinition } from "./types";

export const MENU_OPTIONS: readonly OptionDefinition[] = [
  {
    type: "website",
    label: "WEBSITES",
    path: DOCUMENT_TYPE_TO_ROOT_PATH["website"],
  },
  {
    type: "film",
    label: "FILMS",
    path: DOCUMENT_TYPE_TO_ROOT_PATH["film"],
  },
  {
    type: "dj",
    label: "DJ",
    path: DOCUMENT_TYPE_TO_ROOT_PATH["dj"],
  },
  {
    type: "blog",
    label: "BLOG",
    path: DOCUMENT_TYPE_TO_ROOT_PATH["blog"],
  },
  {
    type: "about",
    label: "ABOUT",
    path: "/about",
  },
];

export const NUM_MENU_OPTIONS = MENU_OPTIONS.length;
export const HOME_ITEM_ANGLE = (2 * Math.PI) / NUM_MENU_OPTIONS;
