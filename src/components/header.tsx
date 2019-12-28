import React from "react";
import styled from "@emotion/styled";

import * as routes from "../routes";
import { title } from "../content";
import * as styles from "../styles";
import Icon from "./icon";
import { useLink } from "./hooks";

const Container = styled.header({
  boxSizing: "border-box",
  width: "100%",
  height: styles.headerHeight,
  padding: `0 ${styles.standardPadding}px`,
  display: "flex",
  color: styles.black,
  borderBottom: `1px solid ${styles.lightGray}`,
  alignItems: "center",
  justifyContent: "space-between"
});

const H1 = styled.h1({
  paddingLeft: 8,
  textAlign: "left",
  textTransform: "uppercase",
  width: "100%",
  margin: "auto",
  fontWeight: 300,
  fontSize: "1rem",
  letterSpacing: ".03rem",
  color: "inherit"
});

const LogoContainer = styled.div({
  width: 24,
  height: 24
});

const Link = styled.a<{ isActive?: boolean | null }>(({ isActive }) => ({
  textDecoration: "none",
  borderBottom: "1px solid currentColor",
  color: "inherit",
  ...(isActive ? { fontWeight: 700 } : {})
}));

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
    marginLeft: 20
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
