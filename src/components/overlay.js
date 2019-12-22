import React from "react";
import styled from "@emotion/styled";
import * as vars from "../styles/vars";
import Static from "./static";

const Container = styled.div(({ isActive }) => ({
  position: "fixed",
  width: "100vw",
  height: `calc(100vh - ${vars.headerHeight}px)`,
  top: vars.headerHeight + "px",
  padding: vars.standardPadding + "px",
  left: "0",
  background: vars.blue,
  zIndex: "1000",
  color: vars.white,
  borderTop: `2px solid ${vars.white}`,
  opacity: "0",
  pointerEvents: "none",
  transition: "all .2s",
  textAlign: "right",
  ...(isActive
    ? {
        pointerEvents: "all",
        opacity: "1"
      }
    : {})
}));

export default ({ isActive, content }) => (
  <Container isActive={isActive}>
    <Static content={content} />
  </Container>
);
