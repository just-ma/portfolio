import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import MainSubtitle from "./MainSubtitle";
import useIsMobile from "../../hooks/useMobile";

const titleCss = css`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 2;
  line-height: 24px;
  display: flex;
  gap: 10px;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
`;

const FallbackTitle = styled.div`
  font-family: Menlo;
  font-size: 27px;

  ${titleCss}
`;

const Title = styled(Link)<{ titlefont: TitleFont }>`
  font-family: "${({ titlefont }) => titlefont.family}";
  font-size: ${({ titlefont }) => titlefont.size + 2}px;

  ${titleCss}
`;

const TitleBlock = styled.div<{ $dark: boolean }>`
  display: inline-block;
  border: 1px solid blue;
  background-color: ${({ $dark }) => ($dark ? "black" : "white")};
  color: ${({ $dark }) => ($dark ? "white" : "blue")};
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

  const { titleAnimating, onTitleAnimatingChange } = useAppContext();

  const [hoverAnimating, setHoverAnimting] = useState(false);
  const [titleFont, setTitleFont] = useState<TitleFont>(DEFAULT_FONT);
  const [dark, setDark] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    const timeoutId = setInterval(() => {
      onTitleAnimatingChange(false);
      setTitleFont(DEFAULT_FONT);
    }, 200);

    return () => {
      clearInterval(timeoutId);
    };
  }, [titleAnimating]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setHoverAnimting(false);
      setTitleFont(DEFAULT_FONT);
    }, 200);

    return () => {
      clearInterval(timeoutId);
    };
  }, [hoverAnimating]);

  const randomizeFont = () => {
    setTitleFont(FONTS[Math.floor(Math.random() * (FONTS.length - 1))]);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (titleAnimating || hoverAnimating) {
      randomizeFont();
      intervalId = setInterval(() => {
        randomizeFont();
        setDark(false);
      }, 67);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [titleAnimating, hoverAnimating]);

  const startAnimation = () => {
    onTitleAnimatingChange(true);
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
    <Suspense
      fallback={
        <FallbackTitle>
          <TitleBlock $dark={dark}>NIT</TitleBlock>
          <TitleBlock $dark={dark}>SU</TitleBlock>
          <TitleBlock $dark={dark}>J.</TitleBlock>
        </FallbackTitle>
      }
    >
      <Title
        titlefont={titleFont}
        onClick={handleTitleClick}
        onMouseEnter={() => setHoverAnimting(true)}
        to={"/"}
      >
        <TitleBlock $dark={dark}>NIT</TitleBlock>
        <TitleBlock $dark={dark}>SU</TitleBlock>
        <TitleBlock $dark={dark}>J.</TitleBlock>
      </Title>
      {isMobile && <MainSubtitle />}
    </Suspense>
  );
};

export default MainHeader;
