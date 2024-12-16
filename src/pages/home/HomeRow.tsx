import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { MEDIA_SIZE, OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import Thumbnail from "../../components/Thumbnail";

import { useEffect, useRef, useState } from "react";
import useIsMobile from "../../hooks/useMobile";
import {
  PageLeftContainer,
  PageRightContainer,
} from "../../components/DividedPage";
import { Dot } from "../../components/Dot";
import { PortableText } from "@portabletext/react";
import {
  DocumentDefinition,
  GalleyThumbnailDefinition,
  urlFor,
} from "../../sanity";

export const FIRST_ROW_OFFSET_PX = 150;
export const MOBILE_FIRST_ROW_OFFSET_PX = 300;
const STICKY_CONTAINER_TOP_PX = 300;
const INFO_HIDE_THRESHOLD_TOP_PX = STICKY_CONTAINER_TOP_PX - 50;
const SHOW_SUBTITLE_THRESHOLD_TOP_PX = STICKY_CONTAINER_TOP_PX + 40;

const InfoContainer = styled(PageLeftContainer)`
  padding: 0 20px 70px;

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
  max-width: 100%;

  @media ${MEDIA_SIZE.mobile} {
    flex-basis: 100vw;
    padding-top: 20px;
  }
`;

const Row = styled.div<{ $firstRowOffset: boolean }>`
  display: flex;
  width: 100%;

  ${({ $firstRowOffset }) =>
    $firstRowOffset &&
    css`
      &:first-child {
        ${InfoContainer}, ${ImageContainer} {
          padding-top: ${FIRST_ROW_OFFSET_PX}px;

          @media ${MEDIA_SIZE.mobile} {
            padding-top: ${MOBILE_FIRST_ROW_OFFSET_PX}px;
          }
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
  top: ${STICKY_CONTAINER_TOP_PX}px;
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
  gap: 15px;
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
  max-width: 200px;
  width: fit-content;
`;

const Subtitle = styled.h2<{ $visible: boolean }>`
  max-width: 260px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s;
`;

const StyledThumbnail = styled(Thumbnail)`
  cursor: pointer;
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
  image: GalleyThumbnailDefinition;
  onClick: () => void;
}) => (
  <StyledThumbnail
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
    src={
      typeof image.image === "string" ? image.image : urlFor(image.image).url()
    }
    onClick={onClick}
  />
);

export default function HomeRow({
  item: { _type, slug, title, subtitle, thumbnails },
}: {
  item: DocumentDefinition;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const stickyRef = useRef<HTMLDivElement>(null);

  const [stickyOpacity, setStickyOpacity] = useState(1);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const handleClick = () => {
    navigate(
      `${OPTION_TYPE_TO_ROOT_PATH[_type]}/${
        typeof slug === "string" ? slug : slug.current
      }`
    );
  };

  const handleScroll = () => {
    if (!stickyRef.current) {
      return;
    }

    const top = stickyRef.current.getBoundingClientRect().top;
    setShowSubtitle(top <= SHOW_SUBTITLE_THRESHOLD_TOP_PX);

    if (top > INFO_HIDE_THRESHOLD_TOP_PX) {
      setStickyOpacity(1);
      return;
    }

    setStickyOpacity(Math.max(0, top / INFO_HIDE_THRESHOLD_TOP_PX));
  };

  useEffect(() => {
    if (!isMobile) {
      stickyRef.current &&
        setShowSubtitle(
          stickyRef.current.getBoundingClientRect().top <=
            SHOW_SUBTITLE_THRESHOLD_TOP_PX
        );
      window.addEventListener("scroll", handleScroll);
    }

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
              <Subtitle onClick={handleClick} $visible={showSubtitle}>
                <PortableText value={subtitle} />
              </Subtitle>
            )}
          </Info>
        </StickyContainer>
      </InfoContainer>
      <ImageContainer>
        {thumbnails?.map((image, index) => (
          <RowThumbnail key={index} image={image} onClick={handleClick} />
        ))}
      </ImageContainer>
    </Row>
  );
}
