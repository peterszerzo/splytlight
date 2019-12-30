import React from "react";
import styled from "@emotion/styled";

import * as styles from "../../styles";
import Static from "./static";

const Container = styled.div({
  height: `calc(100vh - ${styles.headerHeight}px)`,
  top: styles.headerHeight,
  padding: styles.standardPadding,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export default ({
  content
}: {
  content: string;
}) => (
  <Container>
    <Static content={content} />
  </Container>
);
