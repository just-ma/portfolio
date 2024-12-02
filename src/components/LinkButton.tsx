import styled, { css } from "styled-components";
import { MEDIA_SIZE } from "../constants";
import { Link } from "react-router-dom";

type LinkButtonProps = {
  $indent?: boolean;
  $selected?: boolean;
  $hovering?: boolean;
  $visible?: boolean;
};

export const LinkButtonLabel = styled.span`
  border: 1px solid blue;
  padding: 0 5px;
  transition: margin-left 0.1s ease-in-out, background-color 0.1s, color 0.1s;
  border-bottom-right-radius: 5px;
  height: 24px;
  line-height: 24px;
  display: block;

  @media ${MEDIA_SIZE.mobile} {
    line-height: 28px;
  }
`;

const hoverCss = css<{ $selected?: boolean }>`
  @media ${MEDIA_SIZE.desktop} {
    ${LinkButtonLabel} {
      background-color: ${({ $selected }) => ($selected ? "#34d08c" : "white")};
      transition: background-color 0s;
    }
  }
`;

const linkButtonCss = css<LinkButtonProps>`
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  width: fit-content;
  pointer-events: all;
  transition: font-size 0.4s;
  text-decoration: none;
  margin-bottom: 2px;
  margin-left: ${({ $indent }) => ($indent ? 30 : 0)}px;
  visibility: ${({ $visible = true }) => ($visible ? "visible" : "hidden")};

  ${LinkButtonLabel} {
    background-color: ${({ $selected }) => ($selected ? "#3eb380" : "#e3e3e3")};
    color: ${({ $selected }) => ($selected ? "#fbffe1" : "blue")};
  }

  &:hover {
    ${hoverCss}
  }

  ${({ $hovering }) => $hovering && hoverCss}

  &:active {
    ${LinkButtonLabel} {
      animation: ${({ $selected }) => ($selected ? "blink" : "none")} 0.2s;
      transition: background-color 0s;

      @keyframes blink {
        from {
          background-color: black;
        }
      }
    }
  }
`;

export const InternalLinkButton = styled(Link)<LinkButtonProps>`
  ${linkButtonCss}
`;

export const ExternalLinkButton = styled.a<LinkButtonProps>`
  ${linkButtonCss}
`;

export const LinkButtonIndent = styled.div`
  margin: 0 6px;
  display: inline-block;
  line-height: 20px;
  color: blue;
`;
