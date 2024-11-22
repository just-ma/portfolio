import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { MEDIA_SIZE, OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import Thumbnail from "../../components/Thumbnail";

import { useEffect, useRef, useState } from "react";
import { ImageDefinition, ItemDefinition } from "./constants";
import useIsMobile from "../../hooks/useMobile";
import {
  PageLeftContainer,
  PageRightContainer,
} from "../../components/DividedPage";
import { Dot } from "../../components/Dot";

export const FIRST_ROW_OFFSET_PX = 150;

const InfoContainer = styled(PageLeftContainer)`
  padding: 0 20px 70px;
  box-sizing: border-box;

  @media ${MEDIA_SIZE.mobile} {
    padding: 0;
  }
`;

const ImageContainer = styled(PageRightContainer)`
  @media ${MEDIA_SIZE.mobile} {
    padding-top: 20px;
  }
`;

const Row = styled.div<{ $firstRowOffset: boolean }>`
  display: flex;
  width: 100%;

  &:last-child {
    ${InfoContainer} {
      padding: 0 20px 0px;
      height: calc(100vh - 200px);

      @media ${MEDIA_SIZE.mobile} {
        padding: 0;
        height: calc(100vh - 400px);
      }
    }
  }

  ${({ $firstRowOffset }) =>
    $firstRowOffset &&
    css`
      &:first-child {
        ${InfoContainer}, ${ImageContainer} {
          padding-top: ${FIRST_ROW_OFFSET_PX}px;
        }
      }
    `}
`;

const StickyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  position: relative;
  position: sticky;
  top: 300px;
  z-index: 4;

  @media ${MEDIA_SIZE.mobile} {
    align-items: flex-start;
    position: relative;
    top: 0;
  }
`;

const Info = styled.div<{ $visible: boolean }>`
  width: fit-content;
  cursor: pointer;
  pointer-events: ${({ $visible }) => ($visible ? "all" : "none")};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  margin-top: -10px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s;

  @media ${MEDIA_SIZE.mobile} {
    align-items: flex-start;
    text-align: left;
    position: absolute;
    left: 60px;
  }
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-family: "IBMPlexMono-MediumItalic";
  font-size: 16px;
  max-width: 200px;
  color: #281f4d;
`;

const Subtitle = styled.div`
  font-size: 13px;
  line-height: 18px;
  white-space: pre-wrap;
  max-width: 200px;
  letter-spacing: -0.2px;
  color: #42438e;

  p {
    margin: 0;
    height: fit-content;
  }
`;

const StyledDot = styled(Dot)<{ size: number }>`
  @media ${MEDIA_SIZE.desktop} {
    right: -20.5px;
  }
`;

const RowThumbnail = ({
  image,
  onClick,
}: {
  image: ImageDefinition;
  onClick: () => void;
}) => (
  <Thumbnail
    style={{
      width: `${image.width}%`,
      height:
        image.heightPx !== undefined
          ? `${image.heightPx}px`
          : image.height !== undefined
          ? `${image.height}%`
          : undefined,
      left: image.left !== undefined ? `${image.left}%` : undefined,
      top:
        image.topPx !== undefined
          ? `${image.topPx}px`
          : image.top !== undefined
          ? `${image.top}%`
          : undefined,
      marginBottom: image.bottom !== undefined ? `${image.bottom}%` : undefined,
      position: image.absolute ? "absolute" : undefined,
      display: image.block ? "block" : undefined,
      zIndex: image.zIndex,
    }}
    src={image.src}
    onClick={onClick}
  />
);

export default function HomeRow({
  item: { _type, slug, title, description, images },
}: {
  item: ItemDefinition;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const stickyRef = useRef<HTMLDivElement>(null);

  const [stickyOpacity, setStickyOpacity] = useState(1);

  const handleClick = () => {
    navigate(`${OPTION_TYPE_TO_ROOT_PATH[_type]}/${slug}`);
  };

  const handleScroll = () => {
    if (!stickyRef.current) {
      return;
    }

    const top = stickyRef.current?.getBoundingClientRect().top;
    if (top > 250) {
      setStickyOpacity(1);
      return;
    }

    setStickyOpacity(Math.max(0, top / 250));
  };

  useEffect(() => {
    !isMobile && window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <Row $firstRowOffset={pathname === "/"}>
      <InfoContainer>
        <StickyContainer ref={stickyRef}>
          <StyledDot size={stickyOpacity} />
          <Info $visible={stickyOpacity > 0.8}>
            <Title onClick={handleClick}>{title}</Title>
            <Subtitle onClick={handleClick}>{description}</Subtitle>
          </Info>
        </StickyContainer>
      </InfoContainer>
      <ImageContainer>
        {images.map((image) => (
          <RowThumbnail key={image.src} image={image} onClick={handleClick} />
        ))}
      </ImageContainer>
    </Row>
  );
}
