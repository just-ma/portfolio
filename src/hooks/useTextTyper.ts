import { useEffect, useRef, useState } from "react";

const useTextTyper = (text: string, show: boolean, delay?: number) => {
  const init = useRef(false);

  const [lastText, setLastText] = useState(text);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === (show ? text.length : 0)) {
      setLastText(text);
      init.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      init.current = true;
      setIndex((prev) => prev + (show && prev < text.length ? 1 : -1));
    }, Math.random() * 100 + ((!init.current && delay) || 0));

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, show, index]);

  const displayedText = lastText.length > text.length ? lastText : text;

  return displayedText.slice(0, index);
};

export default useTextTyper;
