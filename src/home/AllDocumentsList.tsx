import { useQuery } from "@tanstack/react-query";
import ScrollContainer from "../components/ScrollContainer";
import { DocumentDefinition, getDocuments } from "../sanity";
import { WebsitesListPageCard } from "../websites/WebsitesListPage";
import { FilmsListPageCard } from "../films/FilmsListPage";
import { BlogListPageCard } from "../blog/BlogListPage";
import { DJListPageCard } from "../dj/DJListPage";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { INITIAL_VIEWPORT_HEIGHT } from "../constants";

export const DOCUMENTS_LIST_TOP = INITIAL_VIEWPORT_HEIGHT * 1.2;

const StyledScrollContainer = styled(ScrollContainer)`
  margin-top: ${DOCUMENTS_LIST_TOP}px;
  padding-top: 150px;
  position: relative;
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

export const AllListPageCard = ({
  document,
  index,
}: {
  document: DocumentDefinition;
  index: number;
}) => {
  switch (document._type) {
    case "website": {
      return <WebsitesListPageCard document={document} index={index} />;
    }
    case "film": {
      return <FilmsListPageCard document={document} index={index} />;
    }
    case "dj": {
      return <DJListPageCard document={document} index={index} />;
    }
    case "blog": {
      return <BlogListPageCard document={document} index={index} />;
    }
    default: {
      return null;
    }
  }
};

const AllDocumentsList = () => {
  const { data } = useQuery({
    queryKey: ["all"],
    queryFn: async () => {
      const data = await getDocuments();
      return data;
    },
  });

  return (
    <StyledScrollContainer listPage>
      <HeaderBackContainer to={"/"}>
        <Arrow>V</Arrow>
        <Message>main menu</Message>
      </HeaderBackContainer>
      {data?.map((website, index) => (
        <AllListPageCard
          key={website.slug.current}
          document={website}
          index={index}
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
