import styled from "styled-components";
import { MENU_OPTIONS } from "../constants";
import { OptionDefinition } from "../types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
  option: { label, path },
  setActiveIndex,
  setHovering,
  index,
}: {
  option: OptionDefinition;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}) => {
  const handleMouseEnter = () => {
    setActiveIndex(index);
    setHovering(true);
  };

  return (
    <ItemContainer to={path} onMouseEnter={handleMouseEnter}>
      {label}
    </ItemContainer>
  );
};

const HomeMenu = ({
  setActiveIndex,
  setHovering,
}: {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    return () => {
      setHovering(false);
    };
  }, []);

  return (
    <Container onMouseLeave={() => setHovering(false)}>
      {MENU_OPTIONS.map((option, index) => (
        <MenuItem
          option={option}
          key={option.path}
          setActiveIndex={setActiveIndex}
          setHovering={setHovering}
          index={index}
        />
      ))}
    </Container>
  );
};

export default HomeMenu;
