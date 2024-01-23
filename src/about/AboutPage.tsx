import ScrollContainer from "../components/ScrollContainer";
import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../sanity";
import Description from "../components/Description";
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
    <ScrollContainer top={50}>
      <Description value={data.description} />
      <BackFooter />
    </ScrollContainer>
  );
};

export default AboutPage;
