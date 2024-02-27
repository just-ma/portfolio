import { getAppleMurdererPage } from "../../sanity";
import { useQuery } from "@tanstack/react-query";
import AppleMurdererBasePage from "./AppleMurdererBasePage";
import {
  APPLE_MURDERER_ROOT_PATH,
  APPLE_MURDERER_STORAGE_KEY,
} from "./constants";
import { useMemo } from "react";
import { Option, OptionBullet, OptionWrapper } from "./AppleMurdererOption";
import { OPTION_TYPE_TO_ROOT_PATH } from "../../constants";
import { useLocation } from "react-router-dom";

const AppleMurdererLandingPage = () => {
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ["appleMurderer", "0"],
    queryFn: async () => {
      const response = await getAppleMurdererPage("0");
      return response;
    },
  });

  const additionalOptions = useMemo(() => {
    const donzo = localStorage.getItem(APPLE_MURDERER_STORAGE_KEY);
    if (!donzo) {
      return null;
    }

    return (
      <OptionWrapper>
        <Option
          to={`${OPTION_TYPE_TO_ROOT_PATH["blog"]}${APPLE_MURDERER_ROOT_PATH}`}
        >
          <OptionBullet />
          <p>Apple murderer lore...</p>
        </Option>
      </OptionWrapper>
    );
  }, [pathname]);

  return (
    <AppleMurdererBasePage
      pageNum={0}
      description={data?.description}
      options={data?.options}
      additionalOptions={additionalOptions}
    />
  );
};

export default AppleMurdererLandingPage;
