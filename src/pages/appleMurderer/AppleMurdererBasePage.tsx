import { Link, useLocation } from "react-router-dom";
import { AppleMurdererPageDefinition } from "../../sanity";
import Description from "../../components/Description";
import styled, { css } from "styled-components";
import { APPLE_MURDERER_ROOT_PATH } from "./constants";
import { useEffect, useState } from "react";
import AppleMurdererOption from "./AppleMurdererOption";
import AppleMurdererPageNum from "./AppleMurdererPageNum";
import CornerAdornmentPng from "./cornerAdornment.png";
import {
  INITIAL_VIEWPORT_HEIGHT,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import { Helmet } from "react-helmet";

const fadeInCss = css<{ $animate: boolean }>`
  animation: ${({ $animate }) =>
    $animate ? "fadeIn 1s steps(5) forwards" : "none"};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Page = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  width: calc(100% - 20px);
  max-width: 800px;
  height: ${INITIAL_VIEWPORT_HEIGHT * 0.8}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  pointer-events: all;
`;

const Header = styled.div`
  flex-shrink: 0;
  width: 100%;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Title = styled(Link)`
  line-height: 20px;
  height: 20px;
  color: white;
`;

const Body = styled.div<{ $animate: boolean }>`
  flex-grow: 1;
  overflow: hidden;
  align-self: stretch;
  position: relative;

  ${fadeInCss}
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CornerAdornment = styled.img<{ index: number }>`
  position: absolute;
  top: ${({ index }) => (index < 2 ? 0 : "auto")};
  left: ${({ index }) => (index === 0 || index === 3 ? 0 : "auto")};
  bottom: ${({ index }) => (index > 1 ? 0 : "auto")};
  right: ${({ index }) => (index === 1 || index === 2 ? 0 : "auto")};
  transform: scaleY(${({ index }) => (index < 2 ? 1 : -1)})
    scaleX(${({ index }) => (index === 0 || index === 3 ? 1 : -1)});
  width: calc(10% + 40px);
  pointer-events: none;
`;

const BodyColumn = styled.div`
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledDescription = styled(Description)`
  height: 100%;
  box-sizing: border-box;

  p {
    margin: auto 0;
    padding: 20px 0;

    &:last-child {
      padding-bottom: 30%;
    }

    &:first-child {
      padding-bottom: 20px;
    }
  }

  img {
    margin: auto;
  }

  blockquote:last-child {
    padding-bottom: 60px;
  }

  > :first-child {
    padding-top: 30px;
  }

  > :last-child {
    padding-top: 20px;
  }
`;

const OptionsList = styled.div<{ $animate: boolean }>`
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${fadeInCss}
`;

const AppleMurdererBasePage = ({
  pageNum,
  description,
  options,
}: Pick<
  AppleMurdererPageDefinition,
  "description" | "pageNum" | "options"
>) => {
  const { pathname } = useLocation();

  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimate(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animate]);

  useEffect(() => {
    setAnimate(true);
  }, [pathname]);

  const handleOptionClick = (
    event: React.MouseEvent,
    nextPageNum: number | undefined
  ) => {
    if (nextPageNum === undefined) {
      const response = prompt("solve", "")?.trim();
      if (response !== "8" && response !== "eight") {
        alert("no no no :(");
        event.preventDefault();
        return;
      }
    }

    setAnimate(true);
  };

  return (
    <>
      <Helmet>
        <title>{`The Apple Murderer${
          pageNum > 0 ? ` — page ${pageNum}` : ""
        }`}</title>
      </Helmet>
      <Page>
        <Header>
          <Title
            to={`${OPTION_TYPE_TO_ROOT_PATH["blog"]}${APPLE_MURDERER_ROOT_PATH}`}
          >
            The Apple Murderer
          </Title>
          <AppleMurdererPageNum pageNum={pageNum} />
        </Header>
        <Body $animate={animate}>
          <ScrollContainer>
            <BodyColumn>
              {description && <StyledDescription value={description} />}
            </BodyColumn>
          </ScrollContainer>
          <CornerAdornment index={0} src={CornerAdornmentPng} />
          <CornerAdornment index={1} src={CornerAdornmentPng} />
          <CornerAdornment index={2} src={CornerAdornmentPng} />
          <CornerAdornment index={3} src={CornerAdornmentPng} />
        </Body>
        <OptionsList $animate={animate}>
          {options?.map((option) => (
            <AppleMurdererOption
              {...option}
              key={option.pageNum}
              onClick={(event) => handleOptionClick(event, option.pageNum)}
            />
          ))}
        </OptionsList>
      </Page>
    </>
  );
};

export default AppleMurdererBasePage;
