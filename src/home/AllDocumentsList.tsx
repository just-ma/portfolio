import { useQuery } from "@tanstack/react-query";
import ScrollContainer from "../components/ScrollContainer";
import {
  DocumentDefinition,
  DocumentType,
  OptionType,
  getDocuments,
  urlFor,
} from "../sanity";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  INITIAL_VIEWPORT_HEIGHT,
  OPTION_TYPE_TO_ROOT_PATH,
} from "../constants";
import Thumbnail from "../components/Thumbnail";
import Description from "../components/Description";
import useAppContext from "../hooks/useAppContext";

export const DOCUMENTS_LIST_TOP = INITIAL_VIEWPORT_HEIGHT * 1.3;

const StyledScrollContainer = styled(ScrollContainer)<{ disabled: boolean }>`
  margin-top: ${DOCUMENTS_LIST_TOP}px;
  padding-top: 150px;
  position: relative;
  gap: 40px;
  min-height: ${INITIAL_VIEWPORT_HEIGHT}px;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
`;

const BackContainer = styled(Link)`
  margin: 40% 0;
  cursor: pointer;
  user-select: none;
  color: blue;
  text-decoration: none;
`;

const HeaderBackContainer = styled(BackContainer)`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 0;
`;

const Arrow = styled.div`
  font-family: "SyneMono-Regular";
  text-align: center;
  transform: rotate(180deg);
`;

const Message = styled.div`
  text-decoration: underline;
`;

const Card = styled.div<{ hovered: boolean }>`
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  margin-left: ${({ hovered }) => (hovered ? 40 : 0)}px;
  transition: margin-left 0.4s;
  cursor: pointer;
`;

const StyledThumbnail = styled(Thumbnail)<{ hovered: boolean }>`
  width: 150px;

  ${({ hovered }) =>
    hovered &&
    css`
      border: 2px solid blue;
    `}
`;

const Info = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 4px;
`;

const Title = styled.div`
  text-decoration: underline;
  color: blue;
`;

const Subtitle = styled.div`
  p {
    margin: 0;
    height: fit-content;

    &::before {
      content: "(";
      margin-right: 7px;
    }

    &::after {
      content: ")";
      margin-left: 7px;
    }
  }
`;

const DOCUMENT_TYPE_TO_SUBTITLE: Record<DocumentType, string> = {
  website: "website",
  film: "film",
  dj: "dj set",
  blog: "blog post",
};

const AllDocumentsListCard = ({
  document: { _type, title, shortDescription, thumbnail, slug },
  hoveredOption,
}: {
  document: DocumentDefinition;
  hoveredOption: OptionType | null;
}) => {
  const navigate = useNavigate();

  const hovered = hoveredOption === _type;
  const squareThumbnail = _type === "dj" || _type === "blog";

  const handleClick = () => {
    navigate(`${OPTION_TYPE_TO_ROOT_PATH[_type]}/${slug.current}`);
  };

  return (
    <Card hovered={hovered} onClick={handleClick}>
      <StyledThumbnail
        src={urlFor(thumbnail).width(300).url()}
        square={squareThumbnail}
        hovered={hovered}
      />
      <Info>
        <Title>{title}</Title>
        <Subtitle>
          {_type === "dj" || _type === "blog" ? (
            <p>{DOCUMENT_TYPE_TO_SUBTITLE[_type]}</p>
          ) : (
            <Description value={shortDescription} />
          )}
        </Subtitle>
      </Info>
    </Card>
  );
};

const AllDocumentsList = ({ disabled }: { disabled: boolean }) => {
  const { data } = useQuery({
    queryKey: ["all"],
    queryFn: async () => {
      const data = await getDocuments();
      return data;
    },
  });

  const { hoveredOption } = useAppContext();

  return (
    <StyledScrollContainer listPage disabled={disabled}>
      <HeaderBackContainer to={"/"}>
        <Arrow>V</Arrow>
        <Message>main menu</Message>
      </HeaderBackContainer>
      {data?.map((document) => (
        <AllDocumentsListCard
          key={document.slug.current}
          document={document}
          hoveredOption={hoveredOption}
        />
      ))}
      <BackContainer to={"/"}>
        <Arrow>V</Arrow>
        <Message>back</Message>
      </BackContainer>
    </StyledScrollContainer>
  );
};

export default AllDocumentsList;
