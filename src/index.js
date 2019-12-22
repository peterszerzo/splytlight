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
import { Observable } from "rxjs";
import "./styles/setup";

const resizeStream = Observable.fromEvent(window, "resize")
  .map(e => ({
    windowWidth: e.target.innerWidth,
    windowHeight: e.target.innerHeight
  }))
  .throttle(ev => Observable.interval(50))
  .startWith({
    windowWidth: global.window.innerWidth,
    windowHeight: global.window.innerHeight
  });

resizeStream.subscribe(dim => {
  store.dispatch(
    rawStateChange({
      ui: dim
    })
  );
});

Observable.fromEvent(window, "popstate").subscribe(() => {
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
