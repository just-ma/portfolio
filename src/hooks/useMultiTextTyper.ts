import { useEffect, useState } from "react";

const useTextTyper = (text: string, show: boolean) => {
  const [lastText, setLastText] = useState(text);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === (show ? text.length : 0)) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setIndex((prev) => prev + (show ? 1 : -1));
    }, Math.random() * 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, show, index]);

  return text.slice(0, index);
};

export default useTextTyper;
