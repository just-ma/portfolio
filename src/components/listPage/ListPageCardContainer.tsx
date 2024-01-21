import styled, { css } from "styled-components";
import {
  DOCUMENT_TYPE_TO_ROOT_PATH,
  DocumentDefinition,
  DocumentType,
} from "../../sanity";
import { useNavigate } from "react-router-dom";

const getShift = (documentType: DocumentType, index: number) => {
  switch (documentType) {
    case "website": {
      return 40 * ((index + 2) % 3);
    }
    case "film": {
      return 80 * (Math.abs(2 - index) % 3);
    }
    case "dj": {
      return 70 * ((index + 3) % 4) + 30;
    }
    default: {
      return 0;
    }
  }
};

const getAlign = (documentType: DocumentType, index: number) => {
  switch (documentType) {
    case "website": {
      return index % 4 < 2 ? "right" : "left";
    }
    case "film": {
      return index % 4 >= 2 ? "right" : "left";
    }
    case "dj": {
      return (index + 1) % 3 < 2 ? "right" : "left";
    }
    default: {
      return "left";
    }
  }
};

const CardPosition = styled.div<{ align: string; shift: number }>`
  ${({ align, shift }) =>
    align === "left"
      ? css`
          margin-left: auto;
          padding-right: min(${shift}px, calc(100% - 300px));
        `
      : css`
          margin-right: auto;
          padding-left: min(${shift}px, calc(100% - 300px));
        `};
`;

const Card = styled.div<{ square?: boolean }>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  width: ${({ square }) => (square ? 180 : 300)}px;
  cursor: pointer;
`;

const ListPageCardContainer = ({
  document: { _type, slug },
  children,
  index,
  className,
  square,
}: {
  document: DocumentDefinition;
  children: React.ReactNode;
  index: number;
  className?: string;
  square?: boolean;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${DOCUMENT_TYPE_TO_ROOT_PATH[_type]}/${slug.current}`);
  };

  return (
    <CardPosition align={getAlign(_type, index)} shift={getShift(_type, index)}>
      <Card onClick={handleClick} className={className} square={square}>
        {children}
      </Card>
    </CardPosition>
  );
};

export default ListPageCardContainer;