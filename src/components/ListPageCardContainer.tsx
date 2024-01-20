import styled, { css } from "styled-components";
import { DocumentDefinition, DocumentType } from "../sanity";
import { useNavigate } from "react-router-dom";

const getShift = (documentType: DocumentType, index: number) => {
  switch (documentType) {
    case "website": {
      return 40 * ((index + 2) % 3);
    }
    case "film": {
      return 60 * ((index + 1) % 3);
    }
    case "dj": {
      return 70 * ((index + 2) % 3) + 50;
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
      return (index + 1) % 4 < 2 ? "right" : "left";
    }
    case "dj": {
      return (index + 2) % 4 < 3 ? "right" : "left";
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

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  cursor: pointer;
`;

const ListPageCardContainer = ({
  document: { _type, slug },
  children,
  rootPath,
  index,
  className,
}: {
  document: DocumentDefinition;
  children: React.ReactNode;
  rootPath: string;
  index: number;
  className?: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${rootPath}/${slug.current}`);
  };

  return (
    <CardPosition align={getAlign(_type, index)} shift={getShift(_type, index)}>
      <Card onClick={handleClick} className={className}>
        {children}
      </Card>
    </CardPosition>
  );
};

export default ListPageCardContainer;
