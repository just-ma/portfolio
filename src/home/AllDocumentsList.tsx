import { useQuery } from "@tanstack/react-query";
import ScrollContainer from "../components/ScrollContainer";
import { DocumentDefinition, getDocuments } from "../sanity";
import { WebsitesListPageCard } from "../websites/WebsitesListPage";
import { FilmsListPageCard } from "../films/FilmsListPage";
import { BlogListPageCard } from "../blog/BlogListPage";
import { DJListPageCard } from "../dj/DJListPage";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledScrollContainer = styled(ScrollContainer)`
  margin-top: 108vh;
`;

const BackContainer = styled(Link)`
  margin: 40% 0;
  cursor: pointer;
  user-select: none;
  color: blue;
  text-decoration: none;
`;

const HeaderBackContainer = styled(BackContainer)`
  margin: 0 0 15%;
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
