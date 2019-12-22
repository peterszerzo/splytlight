import React from "react";
import { render } from "react-dom";
import { fromEvent, interval } from "rxjs";
import { throttle, map, startWith } from "rxjs/operators";

import Root from "./components/root";
import {
  store,
  rawStateChange,
  fetchTreeRequest,
  changeTree,
  navigate,
  State,
  Tree
} from "./state";
import "./styles/setup";

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
    setState: (stateChange: Partial<State>) => {
      store.dispatch(rawStateChange(stateChange));
    },
    changeTree: (treeChange: Tree) => {
      store.dispatch(changeTree(treeChange));
    }
  };
  render(<Root {...props} />, container);
};

store.dispatch(fetchTreeRequest());

renderApp();

store.subscribe(() => {
  renderApp();
});
