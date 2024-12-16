import styled from "styled-components";
import { DocumentLinkDefinition } from "../../sanity";
import {
  ExternalLinkButton,
  InternalLinkButton,
  LinkButtonIndent,
  LinkButtonLabel,
} from "../LinkButton";
import useReferenceLink from "../../hooks/useReferenceLink";

const LinkLabel = styled(LinkButtonLabel)`
  font-size: 14px;
  line-height: 22px;
  height: 22px;
  border-bottom-left-radius: 5px;
`;

const Indent = styled(LinkButtonIndent)`
  transform: scaleX(-1);
`;

const ReferenceLink = ({
  reference,
  children,
  getLinkLabel,
}: {
  reference: string;
  children?: string;
  getLinkLabel?: (url: string) => string;
}) => {
  const referenceLink = useReferenceLink(reference);

  if (!referenceLink) {
    return null;
  }

  return (
    <InternalLinkButton to={referenceLink}>
      <LinkLabel>
        {children || getLinkLabel?.(referenceLink) || "check it out"}
      </LinkLabel>
      <Indent>{"∟"}</Indent>
    </InternalLinkButton>
  );
};

const ExternalLink = ({
  url,
  children,
  getLinkLabel,
}: {
  url: string;
  children?: string;
  getLinkLabel?: (url: string) => string;
}) => {
  return (
    <ExternalLinkButton href={url} target="_blank" rel="noopener noreferrer">
      <LinkLabel>{children || getLinkLabel?.(url) || "check it out"}</LinkLabel>
      <Indent>{"∟"}</Indent>
    </ExternalLinkButton>
  );
};

export default function DetailsPageLink({
  link,
  getLinkLabel,
}: {
  link: DocumentLinkDefinition;
  getLinkLabel?: (url: string) => string;
}) {
  const { url, reference, label } = link;

  if (url) {
    return (
      <ExternalLink url={url} getLinkLabel={getLinkLabel}>
        {label}
      </ExternalLink>
    );
  }

  if (reference) {
    return (
      <ReferenceLink reference={reference} getLinkLabel={getLinkLabel}>
        {label}
      </ReferenceLink>
    );
  }

  return null;
}
