import React from "react";
import { render } from "react-dom";
import Root from "./components/root";
import {
  store,
  rawStateChange,
  fetchTreeRequest,
  changeTree,
  navigate
} from "./state";
import { fromEvent, interval } from "rxjs";
import { throttle, map, startWith } from "rxjs/operators";
import "./styles/setup";

const resizeStream = fromEvent(window, "resize").pipe(
  map(e => ({
    windowWidth: e.target.innerWidth,
    windowHeight: e.target.innerHeight
  })),
  throttle(() => interval(50)),
  startWith({
    windowWidth: global.window.innerWidth,
    windowHeight: global.window.innerHeight
  })
);

resizeStream.subscribe(dim => {
  store.dispatch(
    rawStateChange({
      ui: dim
    })
  );
});

fromEvent(window, "popstate").subscribe(() => {
  store.dispatch(navigate(window.location.pathname));
});

const container = document.getElementById("app");

const renderApp = () => {
  const props = {
    state: store.getState(),
    setState: stateChange => {
      store.dispatch(rawStateChange(stateChange));
    },
    changeTree: stateChange => {
      store.dispatch(changeTree(stateChange));
    }
  };
  render(<Root {...props} />, container);
};

store.dispatch(fetchTreeRequest());

renderApp();

store.subscribe(() => {
  renderApp();
});
