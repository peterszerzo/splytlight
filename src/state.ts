import { createStore, applyMiddleware } from "redux";
import shortUuid from "short-uuid";
import { createEpicMiddleware, combineEpics, Epic } from "redux-observable";
import { of, from, empty, Observable } from "rxjs";
import { filter, switchMap, delay, map } from "rxjs/operators";

import { Tree } from "./splyt";
import * as backend from "./backend";
import * as routes from "./routes";
import * as state from "./state";

// State

export interface Splyt {
  treeId: string;
  tree: Tree;
}

export interface UiState {
  windowWidth: number;
  windowHeight: number;
}

export type Page = HomePage | NewPage | EditPage | AboutPage | null;

export interface HomePage {
  route: routes.HomeRoute;
  splyts: Splyt[] | null;
}

export interface NewPage {
  route: routes.NewRoute;
  tree: Tree;
}

export interface EditPage {
  route: routes.EditRoute;
  splyt: Splyt | null;
}

export interface AboutPage {
  route: routes.AboutRoute;
}

export interface State {
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
  FetchSplytsResponse = "FetchSplytsResponse",
  // Edit
  EditPageFetchSplyt = "EditPageFetchSplyt",
  EditPageFetchSplytResponse = "EditPageFetchSplytResponse"
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
  payload: Splyt;
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
  payload: Splyt[];
}

export const fetchSplytsResponse = (
  payload: FetchSplytsResponse["payload"]
): FetchSplytsResponse => ({
  type: ActionTypes.FetchSplytsResponse,
  payload
});

//

interface EditPageFetchSplyt {
  type: ActionTypes.EditPageFetchSplyt;
  payload: string;
}

export const editPageFetchSplyt = (
  payload: EditPageFetchSplyt["payload"]
): EditPageFetchSplyt => ({
  type: ActionTypes.EditPageFetchSplyt,
  payload
});

//

interface EditPageFetchSplytResponse {
  type: ActionTypes.EditPageFetchSplytResponse;
  payload: Splyt;
}

export const editPageFetchSplytResponse = (
  payload: EditPageFetchSplytResponse["payload"]
): EditPageFetchSplytResponse => ({
  type: ActionTypes.EditPageFetchSplytResponse,
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
  | FetchSplytsResponse
  | EditPageFetchSplyt
  | EditPageFetchSplytResponse;

// Reducers

const reducer = (state: State = initialState, action: Action): State => {
  console.log(action);
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
      return state;
    case ActionTypes.PageChange:
      return {
        ...state,
        page: action.payload
      };
    case ActionTypes.ChangeNewTree:
      return state.page && routes.isNewRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              tree: {
                ...(state.page as NewPage).tree,
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
      return state.page && routes.isHomeRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              splyts: action.payload
            }
          }
        : state;
    case ActionTypes.EditPageFetchSplyt:
      return state;
    case ActionTypes.EditPageFetchSplytResponse:
      return state.page && routes.isEditRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              splyt: action.payload
            }
          }
        : state;
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
      const route = routes.toRoute();
      if (!route) {
        return empty();
      }
      if (routes.isHomeRoute(route)) {
        return of(
          pageChange({
            route,
            splyts: null
          }),
          fetchSplyts()
        );
      }
      if (routes.isAboutRoute(route)) {
        return of(
          pageChange({
            route
          })
        );
      }
      if (routes.isNewRoute(route)) {
        return of(
          pageChange({
            route,
            tree: getInitialTree()
          })
        );
      }
      if (routes.isEditRoute(route)) {
        return of(
          pageChange({
            route,
            splyt: null
          }),
          editPageFetchSplyt(route.id)
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
      return from(backend.fetchSplyts()).pipe(
        map(splyts => fetchSplytsResponse(splyts))
      );
    })
  );

const fetchSplytEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.EditPageFetchSplyt),
    switchMap(action => {
      return from(
        backend.fetchSplyt((action as EditPageFetchSplyt).payload)
      ).pipe(map(splyt => editPageFetchSplytResponse(splyt)));
    })
  );

const saveNewTreeInLocalStorageEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.ChangeNewTree),
    delay(200),
    switchMap(action => {
      localStorage.setItem(
        "splytstate",
        JSON.stringify(
          state$.value.page && routes.isNewRoute(state$.value.page.route)
            ? (state$.value.page as state.NewPage).tree
            : {}
        )
      );
      return empty() as Observable<Action>;
    })
  );

const translator = shortUuid();

const saveNewTreeEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.SaveNewTree),
    switchMap(action =>
      from(
        backend.createSplyt({
          treeId: translator.new(),
          tree: (action as SaveNewTree).payload
        })
      ).pipe(map(response => saveNewTreeResponse(response)))
    )
  );

const mainEpic: ApplicationEpic = combineEpics(
  initializeEpic,
  navigateEpic,
  fetchSplytsEpic,
  saveNewTreeInLocalStorageEpic,
  fetchSplytEpic,
  saveNewTreeEpic
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
