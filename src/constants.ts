import { OptionType } from "./sanity";

export const OPTION_TYPES: readonly OptionType[] = [
  "website",
  "film",
  "dj",
  "blog",
  "about",
];

export const OPTION_TYPE_TO_ROOT_PATH: Record<OptionType, string> = {
  website: "/websites",
  film: "/films",
  dj: "/dj",
  blog: "/blog",
  about: "/about",
};

export const OPTION_TYPE_TO_LABEL: Record<OptionType, string> = {
  website: "websites",
  film: "films",
  dj: "dj",
  blog: "blog",
  about: "about",
};
