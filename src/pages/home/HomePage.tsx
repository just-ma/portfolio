import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../../sanity";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import {
  INITIAL_VIEWPORT_HEIGHT,
  MEDIA_SIZE,
  ROOT_PATH_TO_OPTION_TYPE,
} from "../../constants";

import { useEffect, useMemo, useState } from "react";
import { MENU_HEIGHT_PX } from "../../components/main/MainMenu";
import HomeRow, {
  FIRST_ROW_OFFSET_PX,
  MOBILE_FIRST_ROW_OFFSET_PX,
} from "./HomeRow";
import useAppContext from "../../hooks/useAppContext";
import {
  HOME_MENU_TOP_VH,
  MOBILE_HOME_MENU_TOP_VH,
} from "../../components/main/useMainMenu";
import Garfield from "../../components/garfield/Garfield";
import {
  PageLeftContainer,
  PageRightContainer,
} from "../../components/DividedPage";
import {
  GARFIELD_HOME_MESSAGES,
  OPTION_TYPE_TO_GARFIELD_MESSAGES,
} from "./constants";

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
        ? `${
            INITIAL_VIEWPORT_HEIGHT * (1 - 0.01 * MOBILE_HOME_MENU_TOP_VH) -
            MENU_HEIGHT_PX -
            MOBILE_FIRST_ROW_OFFSET_PX +
            50 // mobile viewport difference
          }px`
        : "60px"};
  }
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 200px);

  @media ${MEDIA_SIZE.mobile} {
    height: ${INITIAL_VIEWPORT_HEIGHT * 0.5}px;
  }
`;

const HomePage = () => {
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

  const [filteredItems, garfieldMessages] = useMemo(() => {
    if (!data) {
      return [[], []];
    }

    const pathnameType = ROOT_PATH_TO_OPTION_TYPE[pathname];
    if (!pathnameType) {
      return [data, GARFIELD_HOME_MESSAGES];
    }

    return [
      data.filter((item) => item._type === pathnameType),
      OPTION_TYPE_TO_GARFIELD_MESSAGES[pathnameType],
    ];
  }, [pathname, data]);

  if (animation === "hidden") {
    return null;
  }

  return (
    <Container $fullHeight={isHome} $mildFlicker={animation === "secondary"}>
      {filteredItems.map((da) => (
        <HomeRow key={da.slug.current} item={da} />
      ))}
      <BottomRow>
        <PageLeftContainer />
        <PageRightContainer>
          <Garfield messages={garfieldMessages} />
        </PageRightContainer>
      </BottomRow>
    </Container>
  );
};

export default HomePage;
