import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";

const titleCss = css`
  position: fixed;
  top: 10px;
  left: max(calc(50vw - 400px), 10px);
  z-index: 20;
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

const TitleBlock = styled.div<{ $tempdark?: boolean }>`
  display: inline-block;
  border: 1px solid blue;
  background-color: ${({ $tempdark }) => ($tempdark ? "black" : "white")};
  color: ${({ $tempdark }) => ($tempdark ? "white" : "blue")};
`;

const Title = styled(Link)<{ titlefont: TitleFont; $dark: boolean }>`
  font-family: "${({ titlefont }) => titlefont.family}";
  font-size: ${({ titlefont }) => titlefont.size + 2}px;
  pointer-events: all;

  ${titleCss}

  ${({ $dark }) =>
    $dark &&
    css`
      ${TitleBlock} {
        background-color: black;
        color: white;
        border: 1px solid white;
      }
    `}
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

  const { isInitialLoad, titleAnimating, onTitleAnimatingChange, theme } =
    useAppContext();

  const [hoverAnimating, setHoverAnimating] = useState(false);
  const [titleFont, setTitleFont] = useState<TitleFont>(DEFAULT_FONT);
  const [tempDark, setTempDark] = useState(false);
  const [init, setInit] = useState(
    !isInitialLoad || pathname.slice(1).includes("/")
  );

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
      setHoverAnimating(false);
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
        setTempDark(false);
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
    setTempDark(true);
    startAnimation();
    window.scroll({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    startAnimation();
  }, [pathname]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInit(true);
      setHoverAnimating(true);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <FallbackTitle>
          <TitleBlock>NIT</TitleBlock>
          <TitleBlock>SU</TitleBlock>
          <TitleBlock>J.</TitleBlock>
        </FallbackTitle>
      }
    >
      <Title
        titlefont={titleFont}
        onClick={handleTitleClick}
        onMouseEnter={() => setHoverAnimating(true)}
        to={"/"}
        $dark={theme === "dark"}
      >
        <TitleBlock $tempdark={tempDark}>NIT</TitleBlock>
        <TitleBlock $tempdark={tempDark}>SU</TitleBlock>
        <TitleBlock $tempdark={tempDark}>J.</TitleBlock>
      </Title>
    </Suspense>
  );
};

export default MainHeader;
