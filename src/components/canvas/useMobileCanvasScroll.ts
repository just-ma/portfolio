import { useEffect, useRef, useState } from "react";
import { throttle } from "../../constants";

export default function useMobileCanvasScroll() {
  const lastPointerDownScroll = useRef<number | null>(null);

  const [t, st] = useState("");

  // useEffect(() => {
  //   window.addEventListener("touchmove", handlePointerMove);
  //   window.addEventListener("touchstart", handlePointerDown);
  //   window.addEventListener("touchend", handlePointerUp);

  //   return () => {
  //     window.removeEventListener("touchmove", handlePointerMove);
  //     window.removeEventListener("touchstart", handlePointerDown);
  //     window.removeEventListener("touchend", handlePointerUp);
  //   };
  // }, []);

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const onPointerMove = (e: PointerEvent) => {
    if (!lastPointerDownScroll.current) {
      return;
    }

    // st(`${e.height}, ${e.layerY}, ${e.offsetY}`);

    // window.scroll({
    //   top: Math.max(lastPointerDownScroll.current - e.pageY, 0),
    //   behavior: "instant",
    // });

    window.scroll({
      top: Math.max(lastPointerDownScroll.current - e.screenY, 0),
      behavior: "instant",
    });

    // st(`${lastPointerDownScroll.current}. ${e.clientY}`);
    // st((p) => p + `${wtf},  ${e.screenY};\n`);
    // window.scrollTo({
    //   top: Math.max(lastPointerDownScroll.current - e.clientY, 0),
    //   behavior: "instant",
    // });
  };

  const onPointerDown = (e: PointerEvent) => {
    // st((p) => p - 1);
    lastPointerDownScroll.current = window.scrollY + e.screenY;
  };

  const onPointerUp = () => {
    // st((p) => p + "up");
    lastPointerDownScroll.current = null;
  };

  return {
    onPointerMove,
    onPointerDown,
    onPointerUp,
    t,
  };
}
