import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { fromEvent, interval } from "rxjs";
import { throttle, map, startWith } from "rxjs/operators";

import Overlay from "./overlay";
import getVizContainerDimensions from "../styles/layout";
import { about } from "../content";
import Header from "./header";
import Splyt2dEditor from "./splyt-2d-editor";
import Splyt3dViewer from "./splyt-3d-viewer";
import * as vars from "../styles/vars";
import { css } from "../styles/setup";
import * as state from "../state";
import * as routes from "../routes";
import { useLink } from "./hooks";

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

const Button = styled.button({
  position: "absolute",
  bottom: 20,
  right: 20
});

const Root = () => {
  const currentState = useSelector<state.State, state.State>(s => s);

  const dispatch = useDispatch();

  const linkAttrs = useLink();

  return (
    <Container>
      <Header />
      {(() => {
        if (!currentState.page) {
          return null;
        }
        if (routes.isAboutRoute(currentState.page.route)) {
          return <Overlay isActive={true} content={about} />;
        }
        if (routes.isHomeRoute(currentState.page.route)) {
          const splyts = (currentState.page as state.HomePage).splyts;
          if (!splyts) {
            return "Loading...";
          }
          return (
            <div>
              {splyts.map((splyt, index) => (
                <a {...linkAttrs(routes.editRoute(splyt.treeId))} key={index}>
                  <Splyt3dViewer
                    key={index}
                    tree={splyt.tree}
                    size={{ width: 300, height: 240 }}
                  />
                </a>
              ))}
            </div>
          );
        }
        if (routes.isEditRoute(currentState.page.route)) {
          const vizContainerDimensions = getVizContainerDimensions(
            currentState.ui
          );
          const { splyt } = currentState.page as state.EditPage;
          if (!splyt) {
            return "Loading...";
          }
          return (
            <Main>
              <Viz>
                <Splyt2dEditor
                  tree={splyt.tree}
                  size={vizContainerDimensions}
                  changeTree={change => {}}
                />
              </Viz>
              <Viz>
                <Splyt3dViewer
                  tree={splyt.tree}
                  size={vizContainerDimensions}
                />
              </Viz>
            </Main>
          );
        }
        if (routes.isNewRoute(currentState.page.route)) {
          const vizContainerDimensions = getVizContainerDimensions(
            currentState.ui
          );
          const { tree } = currentState.page as state.NewPage;
          return (
            <Main>
              <Viz>
                <Splyt2dEditor
                  tree={tree}
                  size={vizContainerDimensions}
                  changeTree={change => {
                    dispatch(state.changeNewTree(change));
                  }}
                />
              </Viz>
              <Viz>
                <Splyt3dViewer tree={tree} size={vizContainerDimensions} />
              </Viz>
              <Button
                onClick={() => {
                  dispatch(state.saveNewTree(tree));
                }}
              >
                Save
              </Button>
            </Main>
          );
        }
        return null;
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
      state.store.dispatch(state.changeUiState(newUiState));
    });

    state.store.dispatch(state.initialize());

    // No need to unsubscribe because the app is never unmounted
    fromEvent(window, "popstate").subscribe(() => {
      state.store.dispatch(state.navigate(window.location.pathname));
    });
  }, []);

  return (
    <Provider store={state.store}>
      <Root />
    </Provider>
  );
};
