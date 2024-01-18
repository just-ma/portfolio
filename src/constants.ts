import { OptionDefinition } from "./types";

export const MENU_OPTIONS: readonly OptionDefinition[] = [
  {
    label: "WEBSITES",
    path: "/websites",
  },
  {
    label: "FILMS",
    path: "/films",
  },
  {
    label: "DJ",
    path: "/dj",
  },
  {
    label: "PHOTOS",
    path: "/photos",
  },
  {
    label: "ABOUT",
    path: "/about",
  },
];

export const NUM_MENU_OPTIONS = MENU_OPTIONS.length;
export const HOME_ITEM_ANGLE = (2 * Math.PI) / NUM_MENU_OPTIONS;
