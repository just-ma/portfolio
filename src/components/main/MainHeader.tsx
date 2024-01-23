import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderObjectHitbox from "./HeaderObjectHitbox";
import useAppContext from "../../hooks/useAppContext";
import useTextTyper from "../../hooks/useTextTyper";
import { OPTION_TYPE_TO_LABEL } from "../../constants";
import useScrollTop from "../../hooks/useScrollTop";

const Title = styled(Link)<{ titleFont: TitleFont }>`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  line-height: 24px;
  font-family: "${({ titleFont }) => titleFont.family}";
  font-size: ${({ titleFont }) => titleFont.size}px;
  display: flex;
  gap: 10px;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
`;

const Subtitle = styled.div<{ scrollTop: number }>`
  position: absolute;
  top: calc(18vh - ${({ scrollTop }) => scrollTop}px);
  left: 50%;
  transform: translate(-50%, 0);
  width: fit-content;
  max-width: calc(100% - 20px);
  text-align: center;
  font-size: 18px;
  z-index: 1;
`;

const TitleBlock = styled.div`
  display: inline-block;
  border: 1px solid black;
  background-color: white;
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

  const { animating, onAnimatingChange, pageTitle, scrollContainerRef } =
    useAppContext();
  const scrollTop = useScrollTop(scrollContainerRef);

  const [titleFont, setTitleFont] = useState<TitleFont>(DEFAULT_FONT);

  const preSubtitle = useTextTyper(
    pageTitle.optionType ? OPTION_TYPE_TO_LABEL[pageTitle.optionType] : "",
    !!pageTitle.optionType
  );

  const postSubtitle = useTextTyper(
    ` - ${pageTitle.title || ""}`,
    !!pageTitle.title
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

  return (
    <>
      <Title
        titleFont={titleFont}
        onClick={() => onAnimatingChange(true)}
        to={"/"}
      >
        <TitleBlock>NIT</TitleBlock>
        <TitleBlock>SU</TitleBlock>
        <TitleBlock>J.</TitleBlock>
      </Title>
      <Subtitle scrollTop={scrollTop}>
        {preSubtitle}
        {pageTitle.link ? (
          <>
            {postSubtitle.slice(0, 3)}
            <a href={pageTitle.link} target="_blank" rel="noopener noreferrer">
              {postSubtitle.slice(3)}
            </a>
          </>
        ) : (
          postSubtitle
        )}
      </Subtitle>
      <HeaderObjectHitbox />
    </>
  );
};

export default MainHeader;
