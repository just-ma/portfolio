import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import useDocuments from "../hooks/useDocuments";
import ListPageCard from "../components/listPage/ListPageCard";
import { BlogDefinition } from "../sanity";

export const BlogListPageCard = ({
  document,
  index,
}: {
  document: BlogDefinition;
  index: number;
}) => {
  return <ListPageCard document={document} index={index} square />;
};

const BlogsListPage = () => {
  const { data } = useDocuments("blog");

  return (
    <ScrollContainer listPage>
      {data?.map((blog, index) => (
        <BlogListPageCard
          key={blog.slug.current}
          document={blog}
          index={index}
        />
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default BlogsListPage;
