import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Overlay from "./overlay";
import Nav from "./nav";
import { about } from "../content";
import Header from "./header";
import TwoDee from "./2d";
import ThreeDee from "./3d";
import * as vars from "../styles/vars";
import { css } from "../styles/setup";
import { State, SetState } from "../state";

const Root = styled.div({
  position: "relative"
});

const Main = styled.main({
  position: "fixed",
  width: "100%",
  display: "flex",
  height: `calc(100% - ${vars.headerHeight}px)`,
  bottom: "0",
  left: "0"
});

const Viz = styled.div({
  position: "relative",
  width: "50%",
  height: "100%",
  flex: "1",
  ":first-of-type": {
    borderRight: `1px solid ${vars.faintBlue}`
  }
});

export default ({ state, setState, changeTree }: {
  state: State;
  setState: SetState;
  changeTree: any;
}) => {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerText = css;
    document.head.appendChild(styleTag);
  }, []);

  return (
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
      </Main>
    </Root>
  );
};
