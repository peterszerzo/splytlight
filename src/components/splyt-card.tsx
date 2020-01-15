import React from "react";
import styled from "@emotion/styled";
import formatDistance from "date-fns/fp/formatDistance";

import Splyt3dViewer from "./splyt-3d-viewer";
import { useLink } from "./hooks";
import { Splyt } from "../splyt";
import * as styles from "../styles";
import * as routes from "../routes";
import { Container } from "./ui-kit/create-card";

const Title = styled.h2({
  fontSize: "1.125rem",
  letterSpacing: "0.03rem",
  fontWeight: 400,
  margin: 0
});

const Note = styled.p({
  margin: 0,
  fontSize: "0.75rem",
  color: styles.gray
});

const Content = styled.div({
  position: "absolute",
  textAlign: "center",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 10
});

const SplytCard: React.SFC<{
  splyt: Splyt;
  width: number;
}> = props => {
  const { splyt, width, ...rest } = props;
  const linkAttrs = useLink();

  return (
    <Container {...linkAttrs(routes.editRoute(props.splyt.treeId))} {...rest}>
      <Splyt3dViewer
        tree={props.splyt.tree}
        size={{ width: props.width - 10, height: 230 }}
        style={{ position: "absolute" }}
        activePath={null}
      />
      <Content>
        <Title>{props.splyt.name}</Title>
        <Note>
          {props.splyt.createdAt
            ? `Created ${formatDistance(
                new Date(props.splyt.createdAt),
                new Date()
              )} ago`
            : "Created just now"}
        </Note>
      </Content>
    </Container>
  );
};

export default SplytCard;
