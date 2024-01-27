import ScrollContainer from "../components/ScrollContainer";
import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../sanity";
import Description from "../components/Description";
import BackFooter from "../components/BackFooter";
import styled from "styled-components";
import { INITIAL_VIEWPORT_HEIGHT } from "../constants";
import { useMemo, useState } from "react";

const MAX_COUNT = 11;

const Spacer = styled.div`
  height: ${INITIAL_VIEWPORT_HEIGHT}px;
`;

const MoreFooter = styled.div`
  margin: 40% 0;
  user-select: none;
  cursor: pointer;
  color: blue;
`;

const Message = styled.div`
  text-decoration: underline;
`;

const Arrow = styled.div`
  font-family: "SyneMono-Regular";
  text-align: center;
`;

const AboutPageBlock = ({ index }: { index: number }) => {
  const { data } = useQuery({
    queryKey: ["about", index],
    queryFn: async () => {
      const data = await getAbout(index);
      return data;
    },
  });

  if (!data) {
    return <Spacer />;
  }

  return (
    <>
      <Description value={data.description} />
      <Spacer />
    </>
  );
};

const AboutPage = () => {
  const [count, setCount] = useState(1);

  const arr = useMemo(() => {
    return new Array(count).fill(0);
  }, [count]);

  const handleMoreClick = () => {
    setCount((prev) => Math.min(prev + 1, MAX_COUNT));
  };

  return (
    <ScrollContainer listPage>
      {arr.map((_, index) => (
        <AboutPageBlock index={index} />
      ))}
      {count === MAX_COUNT ? (
        <BackFooter />
      ) : (
        <MoreFooter onClick={handleMoreClick} key={count}>
          <Message>more</Message>
          <Arrow>V</Arrow>
        </MoreFooter>
      )}
    </ScrollContainer>
  );
};

export default AboutPage;
