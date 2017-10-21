import React from "react"
import { css } from "glamor"
import glamorous from "glamorous"
import { title } from "../content"
import Icon from "./icon"

const Header = glamorous.header(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  height: theme.headerHeight + "px",
  background: theme.blue,
  padding: `0 ${theme.standardPadding}px`,
  position: "fixed",
  display: "flex",
  top: "0",
  left: "0"
}))

const H1 = glamorous.h1(({ theme }) => ({
  paddingLeft: "8px",
  textAlign: "left",
  width: "100%",
  margin: "auto",
  fontWeight: "300",
  fontSize: "1.25rem",
  letterSpacing: ".03rem",
  color: theme.white
}))

const LogoContainer = glamorous.div(({ theme }) => ({
  width: theme.headerHeight - 2 * 15 + "px",
  height: theme.headerHeight + "px",
  padding: "15 0"
}))

const logoClass = css(({ theme }) => ({
  width: "100%",
  height: "100%",
  fill: theme.white
}))

export default () => (
  <Header>
    <LogoContainer>
      <Icon className={logoClass} id="logo" />
    </LogoContainer>
    <H1>{title}</H1>
  </Header>
)
