import React from "react";
import styled from "@emotion/styled";
import * as vars from "../styles/vars";
import Static from "./static";

const Container = styled.div({
  height: `calc(100vh - ${vars.headerHeight}px)`,
  top: vars.headerHeight,
  padding: vars.standardPadding,
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
