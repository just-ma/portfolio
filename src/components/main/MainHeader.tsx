import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import MainSubtitle from "./MainSubtitle";
import useIsMobile from "../../hooks/useMobile";

const Title = styled(Link)<{ titleFont: TitleFont }>`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 2;
  line-height: 24px;
  font-family: "${({ titleFont }) => titleFont.family}";
  font-size: ${({ titleFont }) => titleFont.size + 2}px;
  display: flex;
  gap: 10px;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
`;

const TitleBlock = styled.div<{ dark: boolean }>`
  display: inline-block;
  border: 1px solid blue;
  background-color: ${({ dark }) => (dark ? "black" : "white")};
  color: ${({ dark }) => (dark ? "white" : "blue")};
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

  const {
    titleAnimating: animating,
    onTitleAnimatingChange: onAnimatingChange,
  } = useAppContext();

  const [titleFont, setTitleFont] = useState<TitleFont>(DEFAULT_FONT);
  const [dark, setDark] = useState(false);

  const isMobile = useIsMobile();

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
        setDark(false);
      }, 67);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [animating]);

  const startAnimation = () => {
    onAnimatingChange(true);
  };

  const handleTitleClick = () => {
    setDark(true);
    startAnimation();
    window.scroll({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    startAnimation();
  }, [pathname]);

  return (
    <Suspense>
      <Title
        titleFont={titleFont}
        onClick={handleTitleClick}
        onMouseEnter={startAnimation}
        to={"/"}
      >
        <TitleBlock dark={dark}>NIT</TitleBlock>
        <TitleBlock dark={dark}>SU</TitleBlock>
        <TitleBlock dark={dark}>J.</TitleBlock>
      </Title>
      {isMobile && <MainSubtitle />}
    </Suspense>
  );
};

export default MainHeader;
