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
  website: "websites",
  film: "films",
  dj: "dj mixes",
  blog: "misc",
  about: "about",
};

export const MEDIA_SIZE = {
  mobile: "screen and (max-width: 600px)",
  desktop: "screen and (min-width: 601px)",
};

export const INITIAL_VIEWPORT_HEIGHT = window.innerHeight;

export const debounce = (func: Function, timeout: number = 700) => {
  let timeoutId: NodeJS.Timeout;

  return (...params: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...params);
    }, timeout);
  };
};

export const throttle = (func: Function, timeout: number = 700) => {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...params: any[]) => {
    if (timeoutId === undefined) {
      func(...params);

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
      }, timeout);
    }
  };
};
