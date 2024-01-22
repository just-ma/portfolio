import ScrollContainer from "../components/ScrollContainer";
import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../sanity";
import Description from "../components/Description";
import BackFooter from "../components/BackFooter";
import usePageTitleSetter from "../hooks/usePageTitleSetter";

const AboutPage = () => {
  const { data } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const data = await getAbout();
      return data;
    },
  });

  usePageTitleSetter("about");

  if (!data) {
    return null;
  }

  return (
    <ScrollContainer>
      <Description value={data.description} />
      <BackFooter />
    </ScrollContainer>
  );
};

export default AboutPage;
