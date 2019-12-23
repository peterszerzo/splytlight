import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware, combineEpics, Epic } from "redux-observable";
import { of, empty, Observable } from "rxjs";
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
  route: window.location.pathname,
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
};

// Actions

enum ActionTypes {
  RawStateChange = "RawStateChange",
  FetchTreeRequest = "FetchTreeRequest",
  FetchTreeResponse = "FetchTreeResponse",
  ChangeTree = "ChangeTree",
  Navigate = "Navigate"
}

interface RawStateChange {
  type: ActionTypes.RawStateChange;
  payload: Partial<State>;
}

export const rawStateChange = (
  stateChange: Partial<State>
): RawStateChange => ({
  type: ActionTypes.RawStateChange,
  payload: stateChange
});

interface FetchTreeRequest {
  type: ActionTypes.FetchTreeRequest;
}

export const fetchTreeRequest = (): FetchTreeRequest => ({
  type: ActionTypes.FetchTreeRequest
});

interface FetchTreeResponse {
  type: ActionTypes.FetchTreeResponse;
  payload: Tree;
}

export const fetchTreeResponse = (tree: Tree): FetchTreeResponse => ({
  type: ActionTypes.FetchTreeResponse,
  payload: tree
});

interface ChangeTree {
  type: ActionTypes.ChangeTree;
  payload: Partial<Tree>;
}

export const changeTree = (newTree: Partial<Tree>): ChangeTree => ({
  type: ActionTypes.ChangeTree,
  payload: newTree
});

interface Navigate {
  type: ActionTypes.Navigate;
  payload: string;
}

export const navigate = (newRoute: string): Navigate => ({
  type: ActionTypes.Navigate,
  payload: newRoute
});

export type Action =
  | RawStateChange
  | ChangeTree
  | Navigate
  | FetchTreeRequest
  | FetchTreeResponse;

// Reducers

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.RawStateChange:
      return { ...state, ...action.payload };
    case ActionTypes.FetchTreeRequest:
      return state;
    case ActionTypes.FetchTreeResponse:
      return { ...state, tree: action.payload };
    case ActionTypes.ChangeTree:
      const newTree = { ...state.tree, ...action.payload };
      return { ...state, tree: newTree };
    case ActionTypes.Navigate:
      return { ...state, route: action.payload };
    default:
      return state;
  }
};

// Epics

type EpicDependencies = never;

type ApplicationEpic = Epic<Action, Action, State, EpicDependencies>;

const fetchTreeEpic: ApplicationEpic = action$ =>
  action$.pipe(
    filter(action => action.type === ActionTypes.FetchTreeRequest),
    delay(10),
    switchMap(() =>
      of(
        fetchTreeResponse(
          (() => {
            try {
              const tree = JSON.parse(
                localStorage.getItem("splytstate") || "1"
              );
              if (!tree || !tree.size) {
                throw new Error("Not a tree!");
              }
              return tree;
            } catch (err) {
              return initialTree;
            }
          })()
        ) as Action
      )
    )
  );

const navigateEpic: ApplicationEpic = action$ =>
  action$.pipe(
    filter(action => action.type === ActionTypes.Navigate),
    switchMap(action => {
      window.history.pushState(null, "", (action as Navigate).payload);
      return empty() as Observable<Action>;
    })
  );

const saveTreeEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.ChangeTree),
    delay(200),
    switchMap(() => {
      localStorage.setItem("splytstate", JSON.stringify(state$.value.tree));
      return empty() as Observable<Action>;
    })
  );

const mainEpic: ApplicationEpic = combineEpics(
  fetchTreeEpic,
  navigateEpic,
  saveTreeEpic
);

// Store

const epicMiddleware = createEpicMiddleware<
  Action,
  Action,
  State,
  EpicDependencies
>();

export const store = createStore<State, Action, {}, {}>(
  reducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(mainEpic);
