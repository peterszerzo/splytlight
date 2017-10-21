import React from "react"
import glamorous, { ThemeProvider } from "glamorous"
import * as vars from "../styles/vars"
import DrawNav from "./draw-nav"
import Overlay from "./overlay"
import Nav from "./nav"
import { about } from "../content"
import Header from "./header"
import TwoDee from "./2d"
import ThreeDee from "./3d"

const Root = glamorous.div({
  position: "relative"
})

const Main = glamorous.main({
  position: "fixed",
  width: "100%",
  display: "flex",
  height: `calc(100% - ${vars.headerHeight}px)`,
  bottom: "0",
  left: "0"
})

const Viz = glamorous.div({
  position: "relative",
  width: "50%",
  height: "100%",
  flex: "1",
  ":first-of-type": {
    borderRight: `1px solid ${vars.faintBlue}`
  }
})

export default ({ state, setState, changeTree }) => (
  <ThemeProvider theme={vars}>
    <Root>
      <Header />
      <Overlay isActive={state.route === "/about"} content={about} />
      <Nav state={state} setState={setState} />
      <Main>
        <Viz>
          <TwoDee state={state} changeTree={changeTree} />
        </Viz>
        <Viz>
          <ThreeDee state={state} setState={setState} />
        </Viz>
        <DrawNav state={state} setState={setState} />
      </Main>
    </Root>
  </ThemeProvider>
)
