import { getAppleMurdererPage } from "../../sanity";
import { useQuery } from "@tanstack/react-query";
import AppleMurdererBasePage from "./AppleMurdererBasePage";

const AppleMurdererLandingPage = () => {
  const { data } = useQuery({
    queryKey: ["appleMurderer", "0"],
    queryFn: async () => {
      const response = await getAppleMurdererPage("0");
      return response;
    },
  });

  return (
    <AppleMurdererBasePage
      pageNum={0}
      description={data?.description}
      options={data?.options}
    />
  );
};

export default AppleMurdererLandingPage;
