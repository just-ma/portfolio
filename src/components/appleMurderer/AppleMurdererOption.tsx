import { Link } from "react-router-dom";
import { AppleMurdererOptionDefinition } from "../../sanity";
import Description from "../Description";
import styled from "styled-components";
import { APPLE_MURDERER_ROOT_PATH } from "./constants";

export const OptionWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid white;
`;

export const Option = styled(Link)`
  width: 100%;
  display: flex;
  white-space: pre-wrap;
  text-decoration: none;
  border: 5px outset #808080;
  background: #5d5d5d;
  padding: 8px 16px 8px 10px;
  box-sizing: border-box;

  &:active,
  &:active:hover {
    border: 5px inset #707070;
    background: #575757;
    padding: 10px 14px 6px 12px;
  }

  &:hover {
    background: #6d6d6d;
  }

  p {
    color: white;
    margin: 0;
  }
`;

export const OptionBullet = styled.span`
  color: white;
  flex-shrink: 0;
  width: 45px;
`;

const AppleMurdererOption = ({
  pageNum,
  description,
  onClick,
}: AppleMurdererOptionDefinition & {
  onClick: (event: React.MouseEvent) => void;
}) => {
  return (
    <OptionWrapper>
      <Option
        to={`${APPLE_MURDERER_ROOT_PATH}/${pageNum || 8}`}
        onClick={onClick}
      >
        <OptionBullet>{`(${pageNum || "?"})`}</OptionBullet>
        <Description value={description} />
      </Option>
    </OptionWrapper>
  );
};

export default AppleMurdererOption;
