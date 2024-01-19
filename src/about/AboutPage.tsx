import ScrollContainer from "../components/ScrollContainer";
import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../sanity";
import DetailsPageDescription from "../components/DetailsPageDescription";
import BackFooter from "../components/BackFooter";

const AboutPage = () => {
  const { data } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const data = await getAbout();
      return data;
    },
  });

  if (!data) {
    return null;
  }

  return (
    <ScrollContainer>
      <DetailsPageDescription value={data.description} />
      <BackFooter />
    </ScrollContainer>
  );
};

export default AboutPage;
