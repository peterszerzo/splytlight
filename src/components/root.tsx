import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { fromEvent, interval } from "rxjs";
import { throttle, map, startWith } from "rxjs/operators";

import Overlay from "./overlay";
import getVizContainerDimensions from "../styles/layout";
import Nav from "./nav";
import { about } from "../content";
import Header from "./header";
import Splyt2dEditor from "./splyt-2d-editor";
import Splyt3dViewer from "./splyt-3d-viewer";
import * as vars from "../styles/vars";
import { css } from "../styles/setup";
import {
  store,
  State,
  initialize,
  changeUiState,
  changeNewTree,
  Route,
  navigate
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

  return (
    <Container>
      <Header />
      <Nav />
      {(() => {
        if (!state.page) {
          return null;
        }
        switch (state.page.route) {
          case Route.About:
            return (
              <Overlay isActive={true} content={about} />
            );
          case Route.Home:
            const splyts = state.page.splyts;
            if (!splyts) {
              return "Loading...";
            }
            return (
              <div>
                {splyts.map((splyt, index) => (
                  <Splyt3dViewer key={index} tree={splyt.tree} size={{ width: 300, height: 240 }} />
                ))}
              </div>
            );
          case Route.New:
            const vizContainerDimensions = getVizContainerDimensions(state.ui);
            return (
              <Main>
                <Viz>
                  <Splyt2dEditor
                    tree={state.page.tree}
                    size={vizContainerDimensions}
                    changeTree={change => {
                      dispatch(changeNewTree(change));
                    }}
                  />
                </Viz>
                <Viz>
                  <Splyt3dViewer tree={state.page.tree} size={vizContainerDimensions} />
                </Viz>
              </Main>
            );
          default:
            return null;
        }
      })()}
    </Container>
  );
};

const createResizeStream = () =>
  fromEvent(window, "resize").pipe(
    map((ev: any) => ({
      windowWidth: ev.target.innerWidth,
      windowHeight: ev.target.innerHeight
    })),
    throttle(() => interval(100)),
    startWith({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  );

export default () => {
  useEffect(() => {
    const styleTag: HTMLElement = document.createElement("style");
    styleTag.innerText = css;
    document.head.appendChild(styleTag);

    // No need to unsubscribe because the app is never unmounted
    createResizeStream().subscribe(newUiState => {
      store.dispatch(
        changeUiState(newUiState)
      );
    });

    store.dispatch(initialize());

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
