import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { fromEvent, interval } from "rxjs";
import { debounce, map, startWith } from "rxjs/operators";

import SimpleScreen from "./simple-screen";
import Header from "./header";
import * as undoable from "../utils/undoable";
import * as zoom from "../utils/zoom";
import Loader from "./loader";
import Sidebar from "./sidebar";
import IconButton from "./icon-button";
import Splyt2dEditor from "./splyt-2d-editor";
import Splyt3dViewer from "./splyt-3d-viewer";
import SplytCard from "./splyt-card";
import * as styles from "../styles";
import * as state from "../state";
import * as content from "../content";
import * as splyt from "../splyt";
import * as routes from "../routes";

const Container = styled.div({
  position: "relative",
  overflow: "hidden"
});

const Main = styled.main({
  display: "grid",
  gridTemplateColumns: `${styles.sidebarWidth}px 1fr 1fr`,
  gridTemplateRows: "1fr",
  height: `calc(100% - ${styles.headerHeight}px)`,
  "& > *:not(:last-child)": {
    borderRight: `1px solid ${styles.lightGray}`
  }
});

const Viz = styled.div({
  position: "relative",
  height: "100%"
});

const VizCover = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const VizCoverContent = styled.div({
  textAlign: "center",
  width: "fit-content",
  padding: 20,
  maxWidth: 280,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  backgroundColor: styles.white,
  borderRadius: 6,
  "& p": {
    margin: "0 0 10px 0"
  }
});

export const VizControls = styled.div({
  position: "absolute",
  top: 20,
  right: 20
});

const Button = styled.button<{ disabled?: boolean }>(({ disabled }) => ({
  backgroundColor: styles.blue,
  color: styles.white,
  borderRadius: 20,
  fontSize: "1em",
  border: 0,
  display: "inline-block",
  padding: "6px 18px",
  opacity: disabled ? 0.2 : 1,
  ":focus": {
    outline: "none",
    boxShadow: `0 0 0 3px ${styles.faintBlue}`
  },
  ":hover": {
    backgroundColor: styles.lighterBlue
  }
}));

const LinkGrid = styled.div({
  height: `calc(100vh - ${styles.headerHeight}px)`,
  overflow: "auto",
  position: "relative",
  paddingBottom: 50,
  "&::-webkit-scrollbar": {
    display: "none"
  },
  "&::after": {
    content: "' '",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    background:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
  }
});

const Root: React.SFC<{}> = () => {
  const currentState = useSelector<state.State, state.State>(s => s);

  const dispatch = useDispatch();

  const [currentCanvas, setCurrentCanvas] = useState<HTMLCanvasElement | null>(
    null
  );

  const handleCanvasDownload = currentCanvas
    ? () => {
        const image = currentCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        window.location.href = image;
      }
    : undefined;

  return (
    <Container>
      <Header />
      {(() => {
        if (!currentState.page) {
          return null;
        }
        if (routes.isAboutRoute(currentState.page.route)) {
          return <SimpleScreen content={content.about} />;
        }
        if (routes.isHomeRoute(currentState.page.route)) {
          const splyts = (currentState.page as state.HomePage).splyts;
          if (!splyts) {
            return <Loader />;
          }
          const width: number =
            currentState.ui.windowWidth /
            Math.floor(currentState.ui.windowWidth / 320);
          return (
            <LinkGrid>
              {splyts.map((splyt: splyt.Splyt, index: number) => (
                <SplytCard key={index} splyt={splyt} width={width} />
              ))}
            </LinkGrid>
          );
        }
        if (routes.isEditRoute(currentState.page.route)) {
          const vizContainerDimensions = styles.getContainerDimensions(
            currentState.ui
          );
          const { splyt } = currentState.page as state.EditPage;
          if (!splyt) {
            return <Loader />;
          }
          return (
            <Main>
              <Sidebar>
                <IconButton title="Create tree" icon="save" primary />
                <IconButton title="Undo change" icon="rotateCcw" />
                <IconButton title="Redo change" icon="rotateCw" />
                <IconButton title="Zoom in" icon="zoomIn" />
                <IconButton title="Zoom out" icon="zoomOut" />
                <IconButton
                  title="Download image"
                  icon="image"
                  onPress={handleCanvasDownload}
                />
              </Sidebar>
              <Viz>
                <VizCover>
                  <VizCoverContent>
                    <p>This tree has been finalized and cannot be edited</p>
                    <Button
                      key="clone-button"
                      onClick={() => {
                        dispatch(state.cloneTree(splyt.tree));
                      }}
                    >
                      Clone and modify
                    </Button>
                  </VizCoverContent>
                </VizCover>
                <Splyt2dEditor
                  tree={splyt.tree}
                  size={vizContainerDimensions}
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
          const vizContainerDimensions = styles.getContainerDimensions(
            currentState.ui
          );
          const page = currentState.page as state.NewPage;
          const zoomLevel = (() => {
            switch(page.zoom) {
              case "XL":
                return 3;
              case "L":
                return 2;
              case "M":
                return 1;
              case "S":
                return 0.6666;
              case "XS":
                return 0.3333;
            }
          })();
          return (
            <Main>
              <Sidebar>
                <IconButton
                  title="Create tree"
                  icon="save"
                  primary
                  onPress={
                    page.status === "saving"
                      ? undefined
                      : () => {
                          dispatch(
                            state.saveNewTree({
                              tree: undoable.current(page.tree),
                              name: page.name,
                              isPublic: page.isPublic
                            })
                          );
                        }
                  }
                />
                <IconButton
                  title="Undo change"
                  icon="rotateCcw"
                  onPress={
                    undoable.canUndo(page.tree)
                      ? () => {
                          dispatch(state.undoRedoNewTree("undo"));
                        }
                      : undefined
                  }
                />
                <IconButton
                  title="Redo change"
                  icon="rotateCw"
                  onPress={
                    undoable.canRedo(page.tree)
                      ? () => {
                          dispatch(state.undoRedoNewTree("redo"));
                        }
                      : undefined
                  }
                />
                <IconButton
                  title="Zoom in"
                  icon="zoomIn"
                  onPress={(() => {
                    const nextZoom = zoom.zoomIn(page.zoom);
                    if (!nextZoom) {
                      return undefined;
                    }
                    return () => {
                      dispatch(state.changeZoom(nextZoom));
                    };
                  })()}
                />
                <IconButton
                  title="Zoom out"
                  icon="zoomOut"
                  onPress={(() => {
                    const nextZoom = zoom.zoomOut(page.zoom);
                    if (!nextZoom) {
                      return undefined;
                    }
                    return () => {
                      dispatch(state.changeZoom(nextZoom));
                    };
                  })()}
                />
                <IconButton
                  title="Download image"
                  icon="image"
                  onPress={handleCanvasDownload}
                />
              </Sidebar>
              <Viz>
                <Splyt2dEditor
                  tree={page.treeDraft || undoable.current(page.tree)}
                  size={vizContainerDimensions}
                  zoom={zoomLevel}
                  changeTree={newTree => {
                    dispatch(state.changeNewTree(newTree));
                  }}
                />
              </Viz>
              <Viz>
                <Splyt3dViewer
                  tree={undoable.current(page.tree)}
                  size={vizContainerDimensions}
                  canvasRef={canvasEl => {
                    setCurrentCanvas(canvasEl);
                  }}
                />
              </Viz>
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
    debounce(() => interval(150)),
    startWith({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  );

export default () => {
  useEffect(() => {
    const styleTag: HTMLElement = document.createElement("style");
    styleTag.innerText = styles.css;
    document.head.appendChild(styleTag);

    // No need to unsubscribe because the app is never unmounted
    createResizeStream().subscribe(newUiState => {
      state.store.dispatch(state.changeUiState(newUiState));
    });

    state.store.dispatch(state.initialize());

    // No need to unsubscribe because the app is never unmounted
    fromEvent(window, "popstate").subscribe(() => {
      const route = routes.toRoute();
      if (!route) {
        return;
      }
      state.store.dispatch(state.navigate(route));
    });
  }, []);

  return (
    <Provider store={state.store}>
      <Root />
    </Provider>
  );
};
