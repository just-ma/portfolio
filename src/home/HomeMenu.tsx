import styled from "styled-components";
import { Link } from "react-router-dom";
import { OptionType } from "../sanity";
import {
  OPTION_TYPES,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../constants";
import useAppContext from "../hooks/useAppContext";

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemContainer = styled(Link)`
  font-size: 20px;
`;

const MenuItem = ({
  type,
  onHoveredOptionChange,
}: {
  type: OptionType;
  onHoveredOptionChange: (value: OptionType) => void;
}) => {
  const handleMouseEnter = () => {
    onHoveredOptionChange(type);
  };

  return (
    <ItemContainer
      to={OPTION_TYPE_TO_ROOT_PATH[type]}
      onMouseEnter={handleMouseEnter}
    >
      {OPTION_TYPE_TO_LABEL[type]}
    </ItemContainer>
  );
};

const HomeMenu = () => {
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

export default HomeMenu;
