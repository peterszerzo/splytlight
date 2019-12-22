import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { of } from "rxjs";
import { filter, switchMap, delay } from "rxjs/operators";
import { Size } from "./splyt";

// State

export type Status = "added" | "adding" | "removing";

export type Dir = "left" | "right";

export interface Tree {
  size: Size;
  status: Status;
  rotation: number;
  left: Tree | null;
  right: Tree | null;
}

interface UiState {
  windowWidth: number;
  windowHeight: number;
}

export interface State {
  tree: Tree;
  currentSize: Size;
  route: string;
  ui: UiState;
}

export type SetState = (stateChange: Partial<State>) => void;

export type SetTree = (treeChange: Partial<Tree>) => void;

const initialTree: Tree = {
  size: "small",
  status: "added",
  rotation: 0,
  left: null,
  right: null
};

const initialState: State = {
  tree: initialTree,
  currentSize: "small",
  route: "/",
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
};

// Actions

export function rawStateChange(stateChange: Partial<State>) {
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

export function changeTree(newTree: Partial<Tree>) {
  return {
    type: "changeTree",
    payload: newTree
  };
}

export function navigate(newRoute: string) {
  return {
    type: "navigate",
    payload: newRoute
  };
}

// Reducers

function reducer(state: State = initialState, action: any) {
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
      const newTree = { ...state.tree, ...action.payload };
      localStorage.setItem("splytstate", JSON.stringify(newTree));
      return { ...state, tree: newTree };
    case "navigate":
      window.history.pushState(null, "", action.payload);
      return { ...state, route: action.payload };
    default:
      return state;
  }
}

// Epics

const fetchTreeEpic = (action$: any) =>
  action$.pipe(
    filter((action: any) => action.type === "fetchTreeRequest"),
    delay(10),
    switchMap(() =>
      of({
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
    )
  );

// Store

const epicMiddleware = createEpicMiddleware();

export const store = createStore(reducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(fetchTreeEpic);
