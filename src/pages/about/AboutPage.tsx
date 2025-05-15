import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../../sanity";
import Description from "../../components/Description";
import styled, { css } from "styled-components";
import {
  INITIAL_VIEWPORT_HEIGHT,
  OPTION_TYPE_TO_LABEL,
  OPTION_TYPE_TO_META_DESCRIPTION,
} from "../../constants";
import { useMemo, useRef, useState } from "react";
import DividedPage from "../../components/DividedPage";
import Garfield from "../../components/garfield/Garfield";
import { Helmet } from "react-helmet";

const MAX_COUNT = 9;

const GARFIELD_MESSAGES = [
  "DON'T TRUST HIS LIES",
  "I KNOW THINGS I SHOULDN'T",
  "I KNOW WHERE HE LIVES",
  "HE'S A GEMINI",
  "HE'S INFJ",
  "HE'S 5 FOOT 7",
  "HIS SHOE SIZE IS 9.5",
  "HE IS NOT A VETERAN",
  "EMAIL HIM, HE'll LOVE IT",
];

const Container = styled(DividedPage)`
  margin-top: 100px;
`;

const BlockContainer = styled.div<{ $animate: boolean }>`
  overflow: hidden;
  width: 100%;
  margin-bottom: ${INITIAL_VIEWPORT_HEIGHT * 0.1}px;

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

const GarfieldContainer = styled.div`
  width: 100%;
  height: 200px;
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
    return null;
  }

  return (
    <BlockContainer $animate={index !== 0}>
      <Description value={data.description} />
      <Spacer />
    </BlockContainer>
  );
};

const AboutPage = () => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const [count, setCount] = useState(1);

  const arr = useMemo(() => {
    return new Array(count).fill(0);
  }, [count]);

  const handlePointerEnter = () => {
    if (count === MAX_COUNT) {
      return;
    }

    if (timeoutId.current === null) {
      setCount((prev) => Math.min(prev + 1, MAX_COUNT));

      timeoutId.current = setTimeout(() => {
        timeoutId.current = null;
      }, 500);
    }
  };

  return (
    <>
      <Helmet>
        <title>{OPTION_TYPE_TO_LABEL["about"]}</title>
        <meta
          name="description"
          content={OPTION_TYPE_TO_META_DESCRIPTION["about"]}
        />
      </Helmet>
      <Container withDot>
        {arr.map((_, index) => (
          <AboutPageBlock key={index} index={index} />
        ))}
        <GarfieldContainer>
          <Garfield
            onPointerEnter={handlePointerEnter}
            stayHidden={count !== MAX_COUNT}
            messages={GARFIELD_MESSAGES}
          />
        </GarfieldContainer>
      </Container>
    </>
  );
};

export default AboutPage;
