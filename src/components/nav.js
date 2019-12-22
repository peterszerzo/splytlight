import React from "react";
import glamorous from "glamorous";
import * as vars from "../styles/vars";
import { store, navigate } from "../state.js";

const Nav = glamorous.nav({
  position: "static"
});

const Toggle = glamorous.div({
  position: "fixed",
  height: vars.headerHeight,
  top: "0",
  right: "0",
  width: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingRight: vars.standardPadding
});

const Link = glamorous.a({
  textDecoration: "none",
  color: vars.white,
  cursor: "pointer"
});

export default ({ state, setState }) => (
  <Nav>
    <Toggle>
      <Link
        href={"/about"}
        onClick={e => {
          e.preventDefault();
          store.dispatch(navigate(state.route === "/about" ? "/" : "/about"));
        }}
      >
        About
      </Link>
    </Toggle>
  </Nav>
);
