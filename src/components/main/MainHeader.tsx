import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderObjectHitbox from "./HeaderObjectHitbox";
import useAppContext from "../../hooks/useAppContext";
import useTextTyper from "../../hooks/useTextTyper";
import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import { OptionType } from "../../sanity";

const Titles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 30px;
  line-height: 24px;
  box-sizing: border-box;
`;

const Title = styled(Link)<{ titleFont: TitleFont }>`
  font-family: "${({ titleFont }) => titleFont.family}";
  font-size: ${({ titleFont }) => titleFont.size}px;
  display: flex;
  gap: 10px;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
`;

const TitleBlock = styled.div`
  display: inline-block;
  border: 1px solid black;
  background-color: white;
`;

const Subtitle = styled(TitleBlock)`
  font-size: 18px;
  cursor: pointer;
`;

type TitleFont = {
  family: string;
  size: number;
};

const DEFAULT_FONT: TitleFont = {
  family: "SyneMono-Regular",
  size: 30,
};

const FONTS: readonly TitleFont[] = [
  { family: "Banquise-Regular", size: 35 },
  { family: "Credible-Regular", size: 28 },
  { family: "FT88-Gothique", size: 25 },
  { family: "Garamondt-Regular", size: 33 },
  { family: "kaerukaeru-Regular", size: 38 },
  { family: "Louise-Regular", size: 22 },
  { family: "Sligoil-Micro", size: 27 },
  { family: "terminal-grotesque_open", size: 36 },
  { family: "Arial", size: 33 },
  { family: "Arial Black", size: 29 },
  { family: "Helvetica", size: 34 },
  { family: "Times New Roman", size: 36 },
  { family: "Times New Roman", size: 36 },
];

const MainHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { animating, onAnimatingChange, scrollContainerRef } = useAppContext();

  const [optionType, setOptionType] = useState<OptionType | undefined>();
  const [titleFont, setTitleFont] = useState<TitleFont>(DEFAULT_FONT);

  useEffect(() => {
    if (pathname === "/") {
      return;
    }

    const match = OPTION_TYPES.find((type) =>
      pathname.startsWith(OPTION_TYPE_TO_ROOT_PATH[type])
    );

    setOptionType(match);
  }, [pathname]);

  const subtitle = useTextTyper(
    optionType ? OPTION_TYPE_TO_LABEL[optionType] : "",
    pathname !== "/"
  );

  useEffect(() => {
    const timeoutId = setInterval(() => {
      onAnimatingChange(false);
      setTitleFont(DEFAULT_FONT);
    }, 200);

    return () => {
      clearInterval(timeoutId);
    };
  }, [animating]);

  const randomizeFont = () => {
    setTitleFont(FONTS[Math.floor(Math.random() * (FONTS.length - 1))]);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (animating) {
      randomizeFont();
      intervalId = setInterval(() => {
        randomizeFont();
      }, 67);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [animating]);

  useEffect(() => {
    onAnimatingChange(true);
  }, [pathname]);

  const handleSubtitleClick = () => {
    if (pathname === "/" || !optionType) {
      return;
    }

    const rootPath = OPTION_TYPE_TO_ROOT_PATH[optionType];
    if (pathname === rootPath) {
      scrollContainerRef?.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate(rootPath);
    }
  };

  return (
    <>
      <Titles>
        <Title
          titleFont={titleFont}
          onClick={() => onAnimatingChange(true)}
          to={"/"}
        >
          <TitleBlock>NIT</TitleBlock>
          <TitleBlock>SU</TitleBlock>
          <TitleBlock>J.</TitleBlock>
        </Title>
        {!!subtitle.length && (
          <Subtitle onClick={handleSubtitleClick}>{subtitle}</Subtitle>
        )}
      </Titles>
      <HeaderObjectHitbox />
    </>
  );
};

export default MainHeader;
