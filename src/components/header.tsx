import React from "react";
import styled from "@emotion/styled";

import * as routes from "../routes";
import { title } from "../content";
import * as vars from "../styles/vars";
import Icon from "./icon";
import { useLink } from "./hooks";

const Container = styled.header({
  boxSizing: "border-box",
  width: "100%",
  height: vars.headerHeight,
  background: vars.blue,
  padding: `0 ${vars.standardPadding}px`,
  position: "fixed",
  display: "flex",
  color: vars.white,
  alignItems: "center",
  justifyContent: "space-between",
  top: 0,
  left: 0
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

const Link = styled.a({
  textDecoration: "none",
  color: "inherit",
});

const MainLink = styled.a({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: "inherit"
});

const Nav = styled.nav({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  "& > *": {
    marginLeft: 15
  }
});

export default () => {
  const linkAttrs = useLink();
  return (
    <Container>
      <MainLink {...linkAttrs(routes.homeRoute)}>
        <LogoContainer>
          <Icon id="logo" />
        </LogoContainer>
        <H1>{title}</H1>
      </MainLink>
        <Nav>
      <Link {...linkAttrs(routes.newRoute)}>New</Link>
      <Link {...linkAttrs(routes.aboutRoute)}>About</Link>
        </Nav>
    </Container>
  );
};
