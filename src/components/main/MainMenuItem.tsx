import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useTextTyper from "../../hooks/useTextTyper";
import useIsMobile from "../../hooks/useMobile";
import { APPLE_MURDERER_ROOT_PATH } from "../../pages/appleMurderer/constants";
import useAppContext from "../../hooks/useAppContext";
import { OptionType } from "../../sanity";
import {
  InternalLinkButton,
  LinkButtonIndent,
  LinkButtonLabel,
} from "../LinkButton";
import styled from "styled-components";

const Label = styled(LinkButtonLabel)`
  border-bottom-right-radius: 5px;
`;

const MainMenuItem = ({
  type,
  label,
  link,
  indent,
  index,
  hovering,
  collapse,
}: {
  type?: OptionType;
  label: string;
  link: string;
  indent?: boolean;
  index: number;
  hovering: boolean;
  collapse: boolean;
}) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const selected = link === "/" ? isHome : pathname.startsWith(link);

  const isMobile = useIsMobile();
  const { onHoveredItemChange } = useAppContext();

  useEffect(() => {
    onHoveredItemChange(null);
  }, [pathname]);

  const typedLabelDelay = isHome && !collapse ? 300 + index * 100 : 0;
  const typedLabel = useTextTyper(
    label,
    (!collapse || selected) &&
      (!pathname.startsWith(APPLE_MURDERER_ROOT_PATH) || isHome),
    typedLabelDelay
  );

  const handleMouseEnter = () => {
    if (!isMobile) {
      onHoveredItemChange({ label, link, type });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      onHoveredItemChange(null);
    }
  };

  const handleClick = () => {
    if (isHome && selected) {
      const offset = isMobile ? 60 : 280;
      if (window.scrollY < window.innerHeight - offset) {
        window.scroll({ top: window.innerHeight - offset, behavior: "smooth" });
        return;
      }
    }

    window.scroll({ top: 0, behavior: "smooth" });
  };

  if (!typedLabel) {
    return null;
  }

  return (
    <InternalLinkButton
      to={link}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $selected={selected}
      $indent={indent && !collapse}
      $hovering={hovering}
      onClick={handleClick}
      $visible={!!typedLabel}
      title={label}
    >
      <LinkButtonIndent>{"∟"}</LinkButtonIndent>
      <Label>{typedLabel}</Label>
    </InternalLinkButton>
  );
};

export default MainMenuItem;
