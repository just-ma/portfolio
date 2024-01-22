import { useEffect } from "react";
import useAppContext from "./useAppContext";
import { OptionType } from "../sanity";

const usePageTitleSetter = (
  optionType?: OptionType,
  title?: string,
  link?: string
) => {
  const { onPageTitleChange } = useAppContext();

  useEffect(() => {
    if (!optionType) {
      onPageTitleChange({});
      return;
    }

    onPageTitleChange({
      optionType,
      title,
      link,
    });
  }, [optionType, title, link]);
};

export default usePageTitleSetter;
