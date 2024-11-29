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
    position: absolute;
    height: 100%;
    left: 0;
    width: 50vw;
    padding: 0 10px 0;
    display: block;
  }
`;

const ImageContainer = styled(PageRightContainer)`
  @media ${MEDIA_SIZE.mobile} {
    flex-basis: 100vw;
    padding-top: 20px;
  }
`;

const Row = styled.div<{ $firstRowOffset: boolean }>`
  display: flex;
  width: 100%;

  &:last-child {
    ${InfoContainer} {
      padding-bottom: 0;
      height: calc(100vh - 200px);

      @media ${MEDIA_SIZE.mobile} {
        height: calc(50vh);
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
    background-color: #e3e3e3;
    border: 1px solid blue;
    padding: 5px 10px 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 6px;
  max-width: 200px;
  width: fit-content;
`;

const Subtitle = styled.h2`
  max-width: 200px;
`;

const StyledDot = styled(Dot)<{ size: number }>`
  right: -20.5px;

  @media ${MEDIA_SIZE.mobile} {
    right: -10.5px;
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
            {!isMobile && (
              <Subtitle onClick={handleClick}>{description}</Subtitle>
            )}
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
