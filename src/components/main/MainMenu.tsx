import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { OptionType } from "../../sanity";
import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import { useState } from "react";
import useTextTyper from "../../hooks/useTextTyper";

const Container = styled.div`
  position: absolute;
  top: 45px;
  left: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemContainer = styled(Link)`
  font-size: 18px;
  width: fit-content;
  min-width: 60px;
`;

const MenuItem = ({
  type,
  onHoveredOptionChange,
}: {
  type: OptionType;
  onHoveredOptionChange: (value: OptionType) => void;
}) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [hovering, setHovering] = useState(false);

  const label = useTextTyper(OPTION_TYPE_TO_LABEL[type], isHome);
  const postLabel = useTextTyper(" (hi there)", hovering);

  const handleMouseEnter = () => {
    onHoveredOptionChange(type);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  if (!label && !postLabel) {
    return null;
  }

  return (
    <ItemContainer
      to={OPTION_TYPE_TO_ROOT_PATH[type]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
      {postLabel}
    </ItemContainer>
  );
};

const MainMenu = () => {
  const { onHoveredOptionChange } = useAppContext();

  const handleMouseLeave = () => {
    onHoveredOptionChange(null);
  };

  return (
    <Container onMouseLeave={handleMouseLeave}>
      {OPTION_TYPES.map((type) => (
        <MenuItem
          type={type}
          key={type}
          onHoveredOptionChange={onHoveredOptionChange}
        />
      ))}
    </Container>
  );
};

export default MainMenu;
