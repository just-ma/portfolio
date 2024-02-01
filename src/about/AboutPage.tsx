import ScrollContainer from "../components/ScrollContainer";
import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../sanity";
import Description from "../components/Description";
import BackFooter from "../components/BackFooter";
import styled, { css } from "styled-components";
import { INITIAL_VIEWPORT_HEIGHT } from "../constants";
import { useMemo, useState } from "react";

const MAX_COUNT = 11;

const BlockContainer = styled.div<{ $animate: boolean }>`
  overflow: hidden;
  width: 100%;

  ${({ $animate }) =>
    $animate &&
    css`
      animation: expand 1s;
    `};

  @keyframes expand {
    from {
      max-height: 0;
    }
    to {
      max-height: ${INITIAL_VIEWPORT_HEIGHT * 2.5}px;
    }
  }
`;

const Spacer = styled.div`
  height: ${INITIAL_VIEWPORT_HEIGHT * 0.3}px;
`;

const MoreFooter = styled.div`
  margin-bottom: 40%;
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
    <BlockContainer $animate={index !== 0}>
      <Description value={data.description} />
      <Spacer />
    </BlockContainer>
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
        <AboutPageBlock key={index} index={index} />
      ))}
      {count === MAX_COUNT ? (
        <BackFooter />
      ) : (
        <MoreFooter onClick={handleMoreClick} key={count}>
          <Message>more?</Message>
          <Arrow>V</Arrow>
        </MoreFooter>
      )}
    </ScrollContainer>
  );
};

export default AboutPage;
