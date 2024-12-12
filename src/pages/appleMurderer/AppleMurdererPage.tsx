import { useParams } from "react-router-dom";
import { getAppleMurdererPage } from "../../sanity";
import { useQuery } from "@tanstack/react-query";
import AppleMurdererBasePage from "./AppleMurdererBasePage";

const AppleMurdererPage = () => {
  const { pageNum } = useParams<{
    pageNum: string;
  }>();

  const { data } = useQuery({
    queryKey: ["appleMurderer", pageNum],
    queryFn: async () => {
      if (!pageNum) {
        return undefined;
      }

      const response = await getAppleMurdererPage(pageNum);
      return response;
    },
  });

  return (
    <AppleMurdererBasePage
      pageNum={data?.pageNum || Number(pageNum)}
      description={data?.description}
      options={data?.options}
    />
  );
};

export default AppleMurdererPage;
