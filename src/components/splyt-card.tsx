import React from "react";
import styled from "@emotion/styled";
import formatDistance from "date-fns/fp/formatDistance";

import Splyt3dViewer from "./splyt-3d-viewer";
import { useLink } from "./hooks";
import { Splyt } from "../splyt";
import * as styles from "../styles";
import * as routes from "../routes";
import { Container } from "./create-card";

const Title = styled.h2({
  fontSize: "1rem",
  letterSpacing: "0.03rem",
  fontWeight: 400,
  textTransform: "uppercase",
  margin: 0
});

const Note = styled.p({
  margin: 0,
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
