import { useParams } from "react-router-dom";
import BackFooter from "../../components/BackFooter";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import { urlFor } from "../../sanity";
import Thumbnail from "../../components/Thumbnail";
import DividedPage from "../../components/DividedPage";

const BlogDetailsPage = () => {
  const { blogId } = useParams<{
    blogId: string;
  }>();

  const { data: blog } = useDocument("blog", blogId);

  if (!blogId || !blog) {
    return null;
  }

  const { description, thumbnail, title, links } = blog;

  return (
    <DividedPage withDot>
      <Thumbnail src={urlFor(thumbnail).url()} alt={title} />
      <DetailsPageInfo document={blog} links={links} />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["blog"]} />
    </DividedPage>
  );
};

export default BlogDetailsPage;
