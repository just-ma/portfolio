import { useParams } from "react-router-dom";
import { getAppleMurdererPage } from "../../sanity";
import { useQuery } from "@tanstack/react-query";
import AppleMurdererBasePage from "./AppleMurdererBasePage";
import { useEffect } from "react";
import { APPLE_MURDERER_STORAGE_KEY } from "./constants";

const AppleMurdererPage = () => {
  const { pageNum } = useParams<{
    pageNum: string;
  }>();

  const { data, isLoading } = useQuery({
    queryKey: ["appleMurderer", pageNum],
    queryFn: async () => {
      if (!pageNum) {
        return undefined;
      }

      const response = await getAppleMurdererPage(pageNum);
      return response;
    },
  });

  useEffect(() => {
    if (!isLoading && !data?.options?.length) {
      localStorage.setItem(APPLE_MURDERER_STORAGE_KEY, "donzo");
    }
  }, [isLoading, data?.options]);

  return (
    <AppleMurdererBasePage
      pageNum={data?.pageNum || Number(pageNum)}
      description={data?.description}
      options={data?.options}
    />
  );
};

export default AppleMurdererPage;
