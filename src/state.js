import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/delay";

// State

const initialTree = {
  size: "small",
  status: "added",
  rotation: 0,
  left: null,
  right: null
};

const initialState = {
  tree: initialTree,
  currentSize: "small",
  route: "/",
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
};

// Actions

export function rawStateChange(stateChange) {
  return {
    type: "rawStateChange",
    payload: stateChange
  };
}

export function fetchTreeRequest() {
  return {
    type: "fetchTreeRequest"
  };
}

export function changeTree(newTree) {
  return {
    type: "changeTree",
    payload: newTree
  };
}

export function navigate(newRoute) {
  return {
    type: "navigate",
    payload: newRoute
  };
}

// Reducers

function reducer(state = initialState, action) {
  switch (action.type) {
    case "rawStateChange":
      return { ...state, ...action.payload };
    case "resize":
      return {
        ...state,
        ui: {
          windowWidth: action.payload.width,
          windowHeight: action.payload.height
        }
      };
    case "fetchTreeRequest":
      return state;
    case "fetchTreeResponse":
      return { ...state, tree: action.payload };
    case "changeTree":
      const newTree = Object.assign({}, state.tree, action.payload);
      localStorage.setItem("splytstate", JSON.stringify(newTree));
      return { ...state, tree: newTree };
    case "navigate":
      global.history.pushState(null, null, action.payload);
      return { ...state, route: action.payload };
    default:
      return state;
  }
}

// Epics

const fetchTreeEpic = action$ =>
  action$
    .ofType("fetchTreeRequest")
    .delay(10)
    .switchMap(() =>
      Observable.of({
        type: "fetchTreeResponse",
        payload: (() => {
          try {
            const tree = JSON.parse(localStorage.getItem("splytstate") || "1");
            if (!tree || !tree.size) {
              throw new Error("Not a tree!");
            }
            return tree;
          } catch (err) {
            return initialTree;
          }
        })()
      })
    );

// Store

export const store = createStore(
  reducer,
  applyMiddleware(createEpicMiddleware(fetchTreeEpic))
);
