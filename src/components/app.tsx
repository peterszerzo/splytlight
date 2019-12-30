import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { fromEvent, interval } from "rxjs";
import { debounce, map, startWith } from "rxjs/operators";

import Header from "./header";
import * as undoable from "../utils/undoable";
import * as zoom from "../utils/zoom";
import * as uiKit from "./ui-kit";
import MobileScreen from "./mobile-screen";
import Splyt2dEditor from "./splyt-2d-editor";
import Splyt3dViewer from "./splyt-3d-viewer";
import SplytCard from "./splyt-card";
import CreateCard from "./create-card";
import * as styles from "../styles";
import * as state from "../state";
import * as content from "../content";
import * as splyt from "../splyt";
import * as routes from "../routes";

const App: React.SFC<{}> = () => {
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

  if (currentState.ui.windowWidth && currentState.ui.windowWidth < 600) {
    return <MobileScreen />;
  }

  return (
    <uiKit.Layout>
      <Header />
      {(() => {
        if (!currentState.page) {
          return null;
        }
        if (routes.isAboutRoute(currentState.page.route)) {
          return <uiKit.SimpleScreen content={content.about} />;
        }
        if (routes.isHomeRoute(currentState.page.route)) {
          const splyts = (currentState.page as state.HomePage).splyts;
          if (!splyts) {
            return <uiKit.Loader />;
          }
          const width: number =
            currentState.ui.windowWidth /
            Math.floor(currentState.ui.windowWidth / 320);
          return (
            <uiKit.ScrollContainer>
              <CreateCard width={width} />
              {splyts.map((splyt: splyt.Splyt, index: number) => (
                <SplytCard key={index} splyt={splyt} width={width} />
              ))}
            </uiKit.ScrollContainer>
          );
        }
        if (routes.isEditRoute(currentState.page.route)) {
          const vizContainerDimensions = styles.getContainerDimensions(
            currentState.ui
          );
          const { splyt } = currentState.page as state.EditPage;
          if (!splyt) {
            return <uiKit.Loader />;
          }
          return (
            <uiKit.Grid>
              <uiKit.Sidebar>
                <uiKit.IconButton title="Create tree" icon="save" />
                <uiKit.IconButton title="Undo change" icon="rotateCcw" />
                <uiKit.IconButton title="Redo change" icon="rotateCw" />
                <uiKit.IconButton title="Zoom in" icon="zoomIn" />
                <uiKit.IconButton title="Zoom out" icon="zoomOut" />
                <uiKit.IconButton
                  title="Download image"
                  icon="image"
                  onPress={handleCanvasDownload}
                />
              </uiKit.Sidebar>
              <uiKit.Viz
                overlay={{
                  body: "This tree has been finalized and cannot be edited",
                  action: {
                    label: "Clone and modify",
                    onPress: () => {
                      dispatch(state.cloneTree(splyt.tree));
                    }
                  }
                }}
              >
                <Splyt2dEditor
                  tree={splyt.tree}
                  size={vizContainerDimensions}
                />
              </uiKit.Viz>
              <uiKit.Viz>
                <Splyt3dViewer
                  tree={splyt.tree}
                  size={vizContainerDimensions}
                  canvasRef={canvasEl => {
                    setCurrentCanvas(canvasEl);
                  }}
                />
              </uiKit.Viz>
            </uiKit.Grid>
          );
        }
        if (routes.isNewRoute(currentState.page.route)) {
          const vizContainerDimensions = styles.getContainerDimensions(
            currentState.ui
          );
          const page = currentState.page as state.NewPage;
          const zoomLevel = (() => {
            switch (page.zoom) {
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
            <uiKit.Grid>
              <uiKit.Sidebar>
                <uiKit.IconButton
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
                <uiKit.IconButton
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
                <uiKit.IconButton
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
                <uiKit.IconButton
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
                <uiKit.IconButton
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
                <uiKit.IconButton
                  title="Download image"
                  icon="image"
                  onPress={handleCanvasDownload}
                />
              </uiKit.Sidebar>
              <uiKit.Viz>
                <Splyt2dEditor
                  tree={page.treeDraft || undoable.current(page.tree)}
                  size={vizContainerDimensions}
                  zoom={zoomLevel}
                  changeTree={newTree => {
                    dispatch(state.changeNewTree(newTree));
                  }}
                />
              </uiKit.Viz>
              <uiKit.Viz>
                <Splyt3dViewer
                  tree={undoable.current(page.tree)}
                  size={vizContainerDimensions}
                  canvasRef={canvasEl => {
                    setCurrentCanvas(canvasEl);
                  }}
                />
              </uiKit.Viz>
            </uiKit.Grid>
          );
        }
        return null;
      })()}
    </uiKit.Layout>
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

const WrappedApp: React.SFC<{}> = () => {
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
      <App />
    </Provider>
  );
};

export default WrappedApp;
