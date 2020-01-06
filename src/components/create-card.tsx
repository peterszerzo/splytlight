import React from "react";
import styled from "@emotion/styled";

import { useLink } from "./hooks";
import * as styles from "../styles";
import * as routes from "../routes";

export const Container = styled.a({
  height: 242,
  display: "flex",
  verticalAlign: "top",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: styles.white,
  position: "relative",
  color: "inherit",
  textDecoration: "none",
  overflow: "hidden",
  "&:hover": {
    filter: "brightness(96%)"
  },
  "&:focus": {
    outline: "none",
    boxShadow: `inset 0 0 0 4px ${styles.faintBlue}`
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
      {...rest}
    >
      <Content>{plus}</Content>
    </Container>
  );
};

export default SplytCard;
