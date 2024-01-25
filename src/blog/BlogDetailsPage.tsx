import { useParams } from "react-router-dom";
import BackFooter from "../components/BackFooter";
import ScrollContainer from "../components/ScrollContainer";
import DetailsPageInfo from "../components/detailsPage/DetailsPageInfo";
import Description from "../components/Description";
import useDocument from "../hooks/useDocument";
import { OPTION_TYPE_TO_ROOT_PATH } from "../constants";
import { urlFor } from "../sanity";
import styled from "styled-components";
import Thumbnail from "../components/Thumbnail";

const Info = styled(DetailsPageInfo)`
  max-width: 400px;
`;

const BlogDetailsPage = () => {
  const { blogId } = useParams<{
    blogId: string;
  }>();

  const { data: blog } = useDocument("blog", blogId);

  if (!blogId || !blog) {
    return null;
  }

  const { description, thumbnail } = blog;

  return (
    <ScrollContainer>
      <Thumbnail src={urlFor(thumbnail).url()} square />
      <Info document={blog} />
      <Description value={description} />
      <BackFooter defaultPath={OPTION_TYPE_TO_ROOT_PATH["blog"]} />
    </ScrollContainer>
  );
};

export default BlogDetailsPage;
