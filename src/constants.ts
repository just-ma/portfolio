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

export const debounce = (func: Function, timeout: number = 400) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func();
    }, timeout);
  };
};

export const throttle = (func: Function, timeout: number = 400) => {
  let timeoutId: NodeJS.Timeout | undefined;

  return () => {
    if (timeoutId === undefined) {
      func();

      timeoutId = setTimeout(() => {
        timeoutId = undefined;
      }, timeout);
    }
  };
};
