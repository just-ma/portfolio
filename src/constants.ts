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
  blog: "/misc",
  about: "/about",
};

export const ROOT_PATH_TO_OPTION_TYPE: Record<string, OptionType> =
  Object.fromEntries(
    Object.entries(OPTION_TYPE_TO_ROOT_PATH).map(
      ([key, value]) => [value, key] as [string, OptionType]
    )
  );

export const OPTION_TYPE_TO_LABEL: Record<OptionType, string> = {
  website: "Websites",
  film: "Films",
  dj: "DJ Mixes",
  blog: "Misc",
  about: "About",
};

export const OPTION_TYPE_TO_META_DESCRIPTION: Record<OptionType, string> = {
  website: "I'm not hackerman but I know him.",
  film: "Experimental travel vlogs, frame-by-frame animations, and everything in between.",
  dj: "Genres ranging from ambient to triphop to jungle to gabber.",
  blog: "Can you decode his ramblings?",
  about:
    'Hi I’m Justin but I also go by "NIT SU J" which is just "justin" backwards hehe. Currently based in NY. Currently pursing creative fulfillment through web, film, and DJing. Probably working on something new. Probably figuring it out. Hopefully not stressing. Hopefully taking long walks and spending time with friends.',
};

export const MEDIA_SIZE = {
  mobile: "screen and (max-width: 600px)",
  desktop: "screen and (min-width: 601px)",
};

export const INITIAL_VIEWPORT_HEIGHT = window.innerHeight;
