import styled from "styled-components";
import { DocumentDefinition, DocumentLinkDefinition } from "../../sanity";
import Description from "../Description";
import { useMemo } from "react";
import DetailsPageLink from "./DetailsPageLink";

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;
  margin-bottom: 40px;
  margin-top: 5px;
`;

const Left = styled.div`
  flex: 1 1;
`;

const Right = styled.div`
  flex: 0 0 fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TitleContainer = styled.div`
  margin-top: 10px;
  margin-left: 20px;
`;

const Title = styled.h1`
  font-size: 16px;
  display: inline;
`;

const SubtitleDescription = styled(Description)``;

const Subtitle = styled.h2`
  line-height: 20px;
  margin-left: 25px;
  margin-top: 40px;

  ${SubtitleDescription} {
    padding-right: 0;
  }
`;

const DateContainer = styled.span`
  display: inline-flex;
  gap: 10px;
  height: 30px;
  color: #3e3e3e;
  transform: scaleX(0.8);
`;

const DateSegment = styled.span`
  width: fit-content;
  position: relative;
  text-transform: uppercase;
  top: 8px;
  white-space: pre;

  &:nth-child(1) {
    transform: rotateZ(-15deg);
    top: 12px;
  }

  &:nth-child(2) {
    transform: rotateZ(-5deg);
    margin-left: 6px;
  }
`;

const DetailsPageInfo = ({
  document,
  links,
  className,
  getLinkLabel,
}: {
  document: DocumentDefinition;
  links?: DocumentLinkDefinition[];
  className?: string;
  getLinkLabel?: (url: string) => string;
}) => {
  const dateArr = useMemo(() => {
    const date = new Date(document.timestamp);
    const dateString = date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return dateString.split(" ").map((segment) => `${segment} `);
  }, [document.timestamp]);

  return (
    <Container className={className}>
      <Left>
        <TitleContainer>
          <Title>{document.title}</Title>
          <DateContainer>
            {dateArr.map((segment, index) => (
              <DateSegment key={index}>{segment}</DateSegment>
            ))}
          </DateContainer>
        </TitleContainer>
        <Subtitle>
          <SubtitleDescription value={document.subtitle} />
        </Subtitle>
      </Left>
      <Right>
        {links?.map((link) => (
          <DetailsPageLink
            key={`${link.url}-${link.reference}`}
            link={link}
            getLinkLabel={getLinkLabel}
          />
        ))}
      </Right>
    </Container>
  );
};

export default DetailsPageInfo;
