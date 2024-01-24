import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import useDocuments from "../hooks/useDocuments";
import ListPageCard from "../components/listPage/ListPageCard";

const BlogsListPage = () => {
  const { data } = useDocuments("blog");

  return (
    <ScrollContainer listPage>
      {data?.map((blog, index) => (
        <ListPageCard
          key={blog.slug.current}
          document={blog}
          index={index}
          square
        />
      ))}
      <BackFooter />
    </ScrollContainer>
  );
};

export default BlogsListPage;
