import React from "react";
import styled from "@emotion/styled";

import * as styles from "../../styles";

const Container = styled.div({
  height: `calc(100vh - ${styles.headerHeight}px)`,
  overflow: "auto",
  position: "relative",
  paddingBottom: 50,
  "&::-webkit-scrollbar": {
    display: "none"
  },
  "&::after": {
    content: "' '",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    background:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
  },
});

const GridContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gridColumnGap: 0,
  gridRowGap: 0,
  "& > *": {
    borderRight: "1px solid",
    borderBottom: "1px solid",
    borderColor: styles.lightGray
  },
  "@media (min-width: 400px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (min-width: 640px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@media (min-width: 860px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  }
});

const ScrollContainer: React.SFC<{}> = props => {
  const { children, ...rest } = props;

  return <Container {...rest}>
    <GridContainer>{children}</GridContainer>
  </Container>
};

export default ScrollContainer;
