import { useParams } from "react-router-dom";
import DetailsPageFooter from "../../components/detailsPage/DetailsPageFooter";
import DetailsPageInfo from "../../components/detailsPage/DetailsPageInfo";
import Description from "../../components/Description";
import useDocument from "../../hooks/useDocument";
import { urlFor } from "../../sanity";
import Thumbnail from "../../components/Thumbnail";
import DividedPage from "../../components/DividedPage";
import { Helmet } from "react-helmet";
import { OPTION_TYPE_TO_LABEL } from "../../constants";

const BlogDetailsPage = () => {
  const { blogId } = useParams<{
    blogId: string;
  }>();

  const { data: blog } = useDocument("blog", blogId);

  if (!blogId || !blog?.description) {
    return null;
  }

  const { description, thumbnail, title, links } = blog;

  return (
    <>
      <Helmet>
        <title>{`${OPTION_TYPE_TO_LABEL["blog"]} — "${title}"`}</title>
      </Helmet>
      <DividedPage withDot>
        <Thumbnail src={urlFor(thumbnail).url()} alt={title} />
        <DetailsPageInfo document={blog} links={links} />
        <Description value={description} />
        <DetailsPageFooter id={blogId} type="blog" />
      </DividedPage>
    </>
  );
};

export default BlogDetailsPage;
