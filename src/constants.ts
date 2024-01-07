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
    label: "ARTWORK",
    path: "/artwork",
  },
  {
    label: "CONTACT",
    path: "/contact",
  },
];

export const NUM_MENU_OPTIONS = MENU_OPTIONS.length;
export const HOME_ROTATION_DURATION = 4000;
export const HOME_ITEM_ANGLE = (2 * Math.PI) / NUM_MENU_OPTIONS;
