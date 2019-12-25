import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { fromEvent, interval } from "rxjs";
import { throttle, map, startWith } from "rxjs/operators";

import Overlay from "./overlay";
import Nav from "./nav";
import { about } from "../content";
import Header from "./header";
import TwoDee from "./2d";
import ThreeDee from "./3d";
import * as vars from "../styles/vars";
import { css } from "../styles/setup";
import {
  store,
  State,
  rawStateChange,
  fetchTreeRequest,
  changeTree,
  navigate,
  Tree
} from "../state";

const Container = styled.div({
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

const Root = () => {
  const state = useSelector<State, State>(s => s);

  const dispatch = useDispatch();

  const setState = (stateChange: Partial<State>) => {
    dispatch(rawStateChange(stateChange));
  };
  const setTree = (treeChange: Partial<Tree>) => {
    dispatch(changeTree(treeChange));
  };

  return (
    <Container>
      <Header />
      <Overlay isActive={state.route === "/about"} content={about} />
      <Nav />
      <Main>
        <Viz>
          <TwoDee state={state} changeTree={setTree} />
        </Viz>
        <Viz>
          <ThreeDee state={state} setState={setState} />
        </Viz>
      </Main>
    </Container>
  );
};

export default () => {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerText = css;
    document.head.appendChild(styleTag);

    const resizeStream = fromEvent(window, "resize").pipe(
      map((ev: any) => ({
        windowWidth: ev.target.innerWidth,
        windowHeight: ev.target.innerHeight
      })),
      throttle(() => interval(50)),
      startWith({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      })
    );

    // No need to unsubscribe because the app is never unmounted
    resizeStream.subscribe(dim => {
      store.dispatch(
        rawStateChange({
          ui: dim
        })
      );
    });

    store.dispatch(fetchTreeRequest());

    // No need to unsubscribe because the app is never unmounted
    fromEvent(window, "popstate").subscribe(() => {
      store.dispatch(navigate(window.location.pathname));
    });
  }, []);

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
