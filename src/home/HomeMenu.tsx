import styled from "styled-components";
import { MENU_OPTIONS } from "../constants";
import { OptionDefinition } from "../types";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemContainer = styled(Link)`
  font-size: 20px;
`;

const MenuItem = ({
  option: { label, path },
  onHoveredOptionChange,
}: {
  option: OptionDefinition;
  onHoveredOptionChange: (option: string | null) => void;
}) => {
  return (
    <ItemContainer to={path} onMouseEnter={() => onHoveredOptionChange(path)}>
      {label}
    </ItemContainer>
  );
};

const HomeMenu = ({
  onHoveredOptionChange,
}: {
  onHoveredOptionChange: (option: string | null) => void;
}) => {
  return (
    <Container onMouseLeave={() => onHoveredOptionChange(null)}>
      {MENU_OPTIONS.map((option) => (
        <MenuItem
          option={option}
          key={option.path}
          onHoveredOptionChange={onHoveredOptionChange}
        />
      ))}
    </Container>
  );
};

export default HomeMenu;
