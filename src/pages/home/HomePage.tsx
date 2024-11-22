import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../../sanity";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { MEDIA_SIZE, ROOT_PATH_TO_OPTION_TYPE } from "../../constants";

import { useEffect, useMemo, useState } from "react";
import { ITEMS } from "./constants";
import {
  HOME_MENU_TOP_VH,
  MENU_HEIGHT_PX,
  MOBILE_HOME_MENU_TOP_VH,
} from "../../components/main/MainMenu";
import useIsMobile from "../../hooks/useMobile";
import HomeRow, { FIRST_ROW_OFFSET_PX } from "./HomeRow";
import useAppContext from "../../hooks/useAppContext";

const MOBILE_OVERFLOW_MASK_HEIGHT_PX = 170;

const Container = styled.div<{ $fullHeight: boolean; $mildFlicker: boolean }>`
  width: 100vw;
  margin-top: ${({ $fullHeight }) =>
    $fullHeight
      ? `calc(${100 - HOME_MENU_TOP_VH}vh - ${
          MENU_HEIGHT_PX + FIRST_ROW_OFFSET_PX
        }px)`
      : "100px"};
  transition: margin-top 0.4s ease;
  box-sizing: border-box;
  animation: ${({ $mildFlicker }) =>
      $mildFlicker ? "mildFlicker 0.2s" : "flicker 0.3s"}
    forwards;

  @media ${MEDIA_SIZE.mobile} {
    margin-top: ${({ $fullHeight }) =>
      $fullHeight
        ? `calc(${100 - MOBILE_HOME_MENU_TOP_VH}vh - ${MENU_HEIGHT_PX}px)`
        : "20px"};
  }
`;

const OverflowMask = styled.div<{ $visible: boolean }>`
  background: #e1e1e1;
  width: 100vw;
  height: ${MOBILE_OVERFLOW_MASK_HEIGHT_PX}px;
  position: fixed;
  top: 0;
  z-index: 3;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s;
  border-bottom-right-radius: 90%;
  box-shadow: 0 0 30px 60px #e1e1e1;
`;

const MobileOverflowMask = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(window.scrollY > window.innerHeight / 2);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <OverflowMask $visible={visible} />;
};

const HomePage = () => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const { appInit } = useAppContext();

  const { data } = useQuery({
    queryKey: ["all"],
    queryFn: async () => {
      const data = await getDocuments();
      return data;
    },
  });

  const [animation, setAnimation] = useState<
    "hidden" | "primary" | "secondary"
  >(appInit ? "secondary" : "hidden");

  useEffect(() => {
    const timeoutId = appInit
      ? undefined
      : setTimeout(() => {
          setAnimation("primary");
        }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const pathnameType = ROOT_PATH_TO_OPTION_TYPE[pathname];
    if (!pathnameType) {
      return ITEMS;
    }

    return ITEMS.filter((item) => item._type === pathnameType);
  }, [pathname]);

  if (animation === "hidden") {
    return null;
  }

  return (
    <>
      {isMobile && <MobileOverflowMask />}
      <Container $fullHeight={isHome} $mildFlicker={animation === "secondary"}>
        {filteredItems.map((item) => (
          <HomeRow key={item.slug} item={item} />
        ))}
      </Container>
    </>
  );
};

export default HomePage;
