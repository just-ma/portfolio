import { useEffect, useRef } from "react";
import useIsMobile from "../../hooks/useMobile";

export default function useCanvasPointerScroll() {
  const lastPointerDownScroll = useRef<number | null>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const onPointerMove = (e: PointerEvent) => {
    if (isMobile || !lastPointerDownScroll.current) {
      return;
    }

    window.scroll({
      top: Math.max(lastPointerDownScroll.current - e.screenY, 0),
      behavior: "instant",
    });
  };

  const onPointerDown = (e: PointerEvent) => {
    if (isMobile) {
      return;
    }

    lastPointerDownScroll.current = window.scrollY + e.screenY;
  };

  const onPointerUp = () => {
    if (isMobile) {
      return;
    }

    lastPointerDownScroll.current = null;
  };

  return {
    onPointerMove,
    onPointerDown,
    onPointerUp,
  };
}
