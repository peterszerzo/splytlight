import React from "react";
import styled from "@emotion/styled";

import { useLink } from "./hooks";
import * as styles from "../styles";
import * as routes from "../routes";

const Container = styled.a({
  width: 302,
  height: 242,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${styles.lightGray}`,
  marginLeft: -1,
  marginTop: -1,
  backgroundColor: styles.white,
  position: "relative",
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    filter: "brightness(96%)"
  }
});

const plus = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Content = styled.div({
  width: 64,
  height: 64,
  color: styles.blue
});

const SplytCard: React.SFC<{
  width: number;
}> = props => {
  const { width, ...rest } = props;
  const linkAttrs = useLink();

  return (
    <Container
      {...linkAttrs(routes.newRoute)}
      style={{
        width: props.width
      }}
      {...rest}
    >
      <Content>{plus}</Content>
    </Container>
  );
};

export default SplytCard;
