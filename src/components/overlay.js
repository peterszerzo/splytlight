import React from "react";
import { css } from "glamor";
import * as vars from "../styles/vars";
import Static from "./static";

const rootClass = css({
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
  textAlign: "right"
});

const activeClass = css({
  pointerEvents: "all",
  opacity: "1"
});

export default ({ isActive, content }) => (
  <div className={`${rootClass} ${isActive ? activeClass : ""}`}>
    <Static content={content} />
  </div>
);
