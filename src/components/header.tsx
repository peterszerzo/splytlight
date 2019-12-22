import React from "react";
import styled from "@emotion/styled";

import { title } from "../content";
import * as vars from "../styles/vars";
import Icon from "./icon";

const Container = styled.header({
  boxSizing: "border-box",
  width: "100%",
  height: vars.headerHeight + "px",
  background: vars.blue,
  padding: `0 ${vars.standardPadding}px`,
  position: "fixed",
  display: "flex",
  alignItems: "center",
  top: "0",
  left: "0"
});

const H1 = styled.h1({
  paddingLeft: 8,
  textAlign: "left",
  width: "100%",
  margin: "auto",
  fontWeight: 300,
  fontSize: "1.25rem",
  letterSpacing: ".03rem",
  color: vars.white
});

const LogoContainer = styled.div({
  width: 30,
  height: 30,
  color: vars.white
});

export default () => (
  <Container>
    <LogoContainer>
      <Icon id="logo" />
    </LogoContainer>
    <H1>{title}</H1>
  </Container>
);
