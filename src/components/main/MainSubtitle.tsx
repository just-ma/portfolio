import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useTextTyper from "../../hooks/useTextTyper";
import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import { OptionType } from "../../sanity";

const Subtitle = styled.div`
  position: absolute;
  top: 35vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 16px;
  z-index: -1;
  pointer-events: none;
  color: blue;
`;

const MainSubtitle = () => {
  const { pathname } = useLocation();

  const [optionType, setOptionType] = useState<OptionType | undefined>();

  useEffect(() => {
    if (pathname === "/") {
      return;
    }

    const match = OPTION_TYPES.find((type) =>
      pathname.startsWith(OPTION_TYPE_TO_ROOT_PATH[type])
    );

    setOptionType(match);
  }, [pathname]);

  const subtitle = useTextTyper(
    optionType ? `( ${OPTION_TYPE_TO_LABEL[optionType]} )` : "",
    !!optionType && pathname === OPTION_TYPE_TO_ROOT_PATH[optionType]
  );

  return <Subtitle>{subtitle}</Subtitle>;
};

export default MainSubtitle;
