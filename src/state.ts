import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware, combineEpics, Epic } from "redux-observable";
import { of, empty, Observable } from "rxjs";
import { filter, switchMap, delay } from "rxjs/operators";
import { Tree } from "./splyt";
import * as backend from "./backend";

// State

export interface Splyt {
  treeId: string;
  tree: Tree;
}

export interface UiState {
  windowWidth: number;
  windowHeight: number;
}

export enum Route {
  Home = "Home",
  New = "New",
  About = "About"
}

export const toRoute = (): Route | null => {
  switch (window.location.pathname) {
    case "/":
      return Route.New;
    case "/new":
      return Route.New;
    case "/about":
      return Route.About;
    default:
      return null;
  }
};

export type Page =
  | {
      route: Route.Home;
      splyts: Splyt[] | null;
    }
  | {
      route: Route.New;
      tree: Tree;
    }
  | {
      route: Route.About;
    }
  | null;

export interface State {
  route: string;
  ui: UiState;
  page: Page;
}

export type HandleChange<T> = (change: Partial<T>) => void;

const initialTree: Tree = {
  size: "small",
  status: "added",
  rotation: 0,
  left: null,
  right: null
};

const initialState: State = {
  route: window.location.pathname,
  ui: {
    windowHeight: 0,
    windowWidth: 0
  },
  page: null
};

// Actions

enum ActionTypes {
  ChangeUiState = "ChangeUiState",
  Initialize = "Initialize",
  Navigate = "Navigate",
  PageChange = "PageChange",
  // New
  ChangeNewTree = "ChangeNewTree",
  SaveNewTree = "SaveNewTree",
  SaveNewTreeResponse = "SaveNewTreeResponse",
  // Home
  FetchSplyts = "FetchSplyts",
  FetchSplytsResponse = "FetchSplyts"
}

//

interface ChangeUiState {
  type: ActionTypes.ChangeUiState;
  payload: Partial<UiState>;
}

export const changeUiState = (
  payload: ChangeUiState["payload"]
): ChangeUiState => ({
  type: ActionTypes.ChangeUiState,
  payload
});

//

interface Initialize {
  type: ActionTypes.Initialize;
}

export const initialize = (): Initialize => ({
  type: ActionTypes.Initialize
});

//

interface Navigate {
  type: ActionTypes.Navigate;
  payload: string;
}

export const navigate = (payload: Navigate["payload"]): Navigate => ({
  type: ActionTypes.Navigate,
  payload
});

//

interface PageChange {
  type: ActionTypes.PageChange;
  payload: Page;
}

export const pageChange = (payload: PageChange["payload"]): PageChange => ({
  type: ActionTypes.PageChange,
  payload
});

//

interface ChangeNewTree {
  type: ActionTypes.ChangeNewTree;
  payload: Partial<Tree>;
}

export const changeNewTree = (
  payload: ChangeNewTree["payload"]
): ChangeNewTree => ({
  type: ActionTypes.ChangeNewTree,
  payload
});

//

interface SaveNewTree {
  type: ActionTypes.SaveNewTree;
  payload: Tree;
}

export const saveNewTree = (payload: SaveNewTree["payload"]): SaveNewTree => ({
  type: ActionTypes.SaveNewTree,
  payload
});

//

interface SaveNewTreeResponse {
  type: ActionTypes.SaveNewTreeResponse;
  payload: Tree;
}

export const saveNewTreeResponse = (
  payload: SaveNewTreeResponse["payload"]
): SaveNewTreeResponse => ({
  type: ActionTypes.SaveNewTreeResponse,
  payload
});

//

interface FetchSplyts {
  type: ActionTypes.FetchSplyts;
}

export const fetchSplyts = (): FetchSplyts => ({
  type: ActionTypes.FetchSplyts
});

//

interface FetchSplytsResponse {
  type: ActionTypes.FetchSplytsResponse;
  payload: Tree;
}

export const fetchSplytsResponse = (
  payload: FetchSplytsResponse["payload"]
): FetchSplytsResponse => ({
  type: ActionTypes.FetchSplytsResponse,
  payload
});

export type Action =
  | ChangeUiState
  | Initialize
  | Navigate
  | PageChange
  | ChangeNewTree
  | SaveNewTree
  | SaveNewTreeResponse
  | FetchSplyts
  | FetchSplytsResponse;

// Reducers

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ChangeUiState:
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.payload
        }
      };
    case ActionTypes.Initialize:
      return state;
    case ActionTypes.Navigate:
      return { ...state, route: action.payload };
    case ActionTypes.PageChange:
      return {
        ...state,
        page: action.payload
      };
    case ActionTypes.ChangeNewTree:
      return state.page && state.page.route === Route.New
        ? {
            ...state,
            page: {
              ...state.page,
              tree: {
                ...state.page.tree,
                ...action.payload
              }
            }
          }
        : state;
    case ActionTypes.SaveNewTree:
      return state;
    case ActionTypes.SaveNewTreeResponse:
      return state;
    case ActionTypes.FetchSplyts:
      return state;
    case ActionTypes.FetchSplytsResponse:
      return state;
    default:
      return state;
  }
};

// Epics

type EpicDependencies = never;

type ApplicationEpic = Epic<Action, Action, State, EpicDependencies>;

const getInitialTree = (): Tree => {
  try {
    const tree = JSON.parse(localStorage.getItem("splytstate") || "1");
    if (!tree || !tree.size) {
      throw new Error("Not a tree!");
    }
    return tree;
  } catch (err) {
    return initialTree;
  }
};

const initializeEpic: ApplicationEpic = action$ =>
  action$.pipe(
    filter(action => action.type === ActionTypes.Initialize),
    switchMap(() => {
      const route = toRoute();
      if (route === Route.Home) {
        return of(
          pageChange({
            route: Route.Home,
            splyts: null
          }),
          fetchSplyts()
        );
      }
      if (route === Route.About) {
        return of(
          pageChange({
            route: Route.About
          })
        );
      }
      if (route === Route.New) {
        return of(
          pageChange({
            route: Route.New,
            tree: getInitialTree()
          })
        );
      }
      return empty();
    })
  );

const navigateEpic: ApplicationEpic = action$ =>
  action$.pipe(
    filter(action => action.type === ActionTypes.Navigate),
    switchMap(action => {
      window.history.pushState(null, "", (action as Navigate).payload);
      return of(initialize());
    })
  );

const fetchSplytsEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.FetchSplyts),
    switchMap(action => {
      console.log(action);
      backend.fetchSplyts().then(splyts => {
        console.log(splyts);
      });
      return empty();
    })
  );

const saveTreeEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.ChangeNewTree),
    delay(200),
    switchMap(action => {
      localStorage.setItem(
        "splytstate",
        JSON.stringify(
          state$.value.page && state$.value.page.route === Route.New
            ? state$.value.page.tree
            : {}
        )
      );
      return empty() as Observable<Action>;
    })
  );

const mainEpic: ApplicationEpic = combineEpics(
  initializeEpic,
  navigateEpic,
  fetchSplytsEpic,
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
