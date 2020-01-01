import { createStore, applyMiddleware } from "redux";
import shortUuid from "short-uuid";
import { createEpicMiddleware, combineEpics, Epic } from "redux-observable";
import { of, from, empty, Observable } from "rxjs";
import { filter, switchMap, delay, map } from "rxjs/operators";

import { Tree } from "./splyt";
import * as backend from "./backend";
import * as undoable from "./utils/undoable";
import * as zoom from "./utils/zoom";
import * as routes from "./routes";
import * as state from "./state";
import * as splyt from "./splyt";

// ## Main application state

export interface State {
  ui: UiState;
  page: Page;
}

const initialState: State = {
  ui: {
    windowHeight: 0,
    windowWidth: 0
  },
  page: null
};

// ### UI State

export interface UiState {
  windowWidth: number;
  windowHeight: number;
}

// ### Page state

export type Page = HomePage | NewPage | EditPage | AboutPage | null;

export interface HomePage {
  route: routes.HomeRoute;
  splyts: splyt.Splyt[] | null;
}

export interface NewPage {
  route: routes.NewRoute;
  treeDraft?: Tree;
  tree: undoable.Undoable<Tree>;
  zoom: zoom.Zoom;
  name: string;
  isPublic: boolean;
  status: "editingTree" | "saving";
}

export interface EditPage {
  route: routes.EditRoute;
  splyt: splyt.Splyt | null;
}

export interface AboutPage {
  route: routes.AboutRoute;
}

// ## Actions

enum ActionTypes {
  // General
  ChangeUiState = "ChangeUiState",
  Initialize = "Initialize",
  Navigate = "Navigate",
  PageChange = "PageChange",
  // New page
  ChangeNewTree = "ChangeNewTree",
  ChangeNewTreeName = "ChangeNewTreeName",
  ChangeZoom = "ChangeZoom",
  UndoRedoNewTree = "UndoRedoNewTree",
  SaveNewTree = "SaveNewTree",
  SaveNewTreeResponse = "SaveNewTreeResponse",
  // Home page
  FetchSplyts = "FetchSplyts",
  FetchSplytsResponse = "FetchSplytsResponse",
  // Edit page
  FetchSplyt = "FetchSplyt",
  FetchSplytResponse = "FetchSplytResponse",
  CloneTree = "CloneTree"
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
  payload: routes.Route;
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

interface ChangeZoom {
  type: ActionTypes.ChangeZoom;
  payload: zoom.Zoom;
}

export const changeZoom = (payload: ChangeZoom["payload"]): ChangeZoom => ({
  type: ActionTypes.ChangeZoom,
  payload
});

//

interface ChangeNewTreeName {
  type: ActionTypes.ChangeNewTreeName;
  payload: string;
}

export const changeNewTreeName = (
  payload: ChangeNewTreeName["payload"]
): ChangeNewTreeName => ({
  type: ActionTypes.ChangeNewTreeName,
  payload
});

//

interface ChangeNewTree {
  type: ActionTypes.ChangeNewTree;
  payload: Tree;
}

export const changeNewTree = (
  payload: ChangeNewTree["payload"]
): ChangeNewTree => ({
  type: ActionTypes.ChangeNewTree,
  payload
});

//

interface UndoRedoNewTree {
  type: ActionTypes.UndoRedoNewTree;
  payload: "undo" | "redo";
}

export const undoRedoNewTree = (
  payload: UndoRedoNewTree["payload"]
): UndoRedoNewTree => ({
  type: ActionTypes.UndoRedoNewTree,
  payload
});

//

interface SaveNewTree {
  type: ActionTypes.SaveNewTree;
  payload: {
    tree: Tree;
    name: string;
    isPublic: boolean;
  };
}

export const saveNewTree = (payload: SaveNewTree["payload"]): SaveNewTree => ({
  type: ActionTypes.SaveNewTree,
  payload
});

//

interface SaveNewTreeResponse {
  type: ActionTypes.SaveNewTreeResponse;
  payload: splyt.Splyt;
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
  payload: splyt.Splyt[];
}

export const fetchSplytsResponse = (
  payload: FetchSplytsResponse["payload"]
): FetchSplytsResponse => ({
  type: ActionTypes.FetchSplytsResponse,
  payload
});

//

interface FetchSplyt {
  type: ActionTypes.FetchSplyt;
  payload: string;
}

export const fetchSplyt = (payload: FetchSplyt["payload"]): FetchSplyt => ({
  type: ActionTypes.FetchSplyt,
  payload
});

//

interface FetchSplytResponse {
  type: ActionTypes.FetchSplytResponse;
  payload: splyt.Splyt;
}

export const fetchSplytResponse = (
  payload: FetchSplytResponse["payload"]
): FetchSplytResponse => ({
  type: ActionTypes.FetchSplytResponse,
  payload
});

//

interface CloneTree {
  type: ActionTypes.CloneTree;
  payload: Tree;
}

export const cloneTree = (payload: CloneTree["payload"]) => ({
  type: ActionTypes.CloneTree,
  payload
});

//

export type Action =
  | ChangeUiState
  | Initialize
  | Navigate
  | PageChange
  | ChangeNewTreeName
  | ChangeNewTree
  | ChangeZoom
  | UndoRedoNewTree
  | SaveNewTree
  | SaveNewTreeResponse
  | CloneTree
  | FetchSplyts
  | FetchSplytsResponse
  | FetchSplyt
  | FetchSplytResponse;

// ## Reducers

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
      return state;
    case ActionTypes.PageChange:
      return {
        ...state,
        page: action.payload
      };
    case ActionTypes.ChangeZoom:
      return state.page && routes.isNewRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              zoom: action.payload
            }
          }
        : state;
    case ActionTypes.ChangeNewTreeName:
      return state.page && routes.isNewRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              name: action.payload
            }
          }
        : state;
    case ActionTypes.ChangeNewTree:
      return state.page && routes.isNewRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              ...(splyt.isTreeDraft(action.payload)
                ? {
                    treeDraft: action.payload
                  }
                : {
                    treeDraft: undefined,
                    tree: undoable.setCurrent(
                      (state.page as NewPage).tree,
                      action.payload
                    )
                  })
            }
          }
        : state;
    case ActionTypes.UndoRedoNewTree:
      return state.page && routes.isNewRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              treeDraft: undefined,
              tree:
                action.payload === "undo"
                  ? undoable.undo((state.page as NewPage).tree)
                  : undoable.redo((state.page as NewPage).tree)
            }
          }
        : state;
    case ActionTypes.SaveNewTree:
      return state.page && routes.isNewRoute(state.page.route)
        ? {
            ...state,
            page: {
              ...state.page,
              status: "saving"
            }
          }
        : state;
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
    case ActionTypes.FetchSplyt:
      return state;
    case ActionTypes.FetchSplytResponse:
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

// ## Epics

type EpicDependencies = never;

type ApplicationEpic = Epic<Action, Action, State, EpicDependencies>;

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
            tree: undoable.create(retrieveTree()),
            name: "NewSplyt",
            zoom: "M",
            isPublic: false,
            status: "editingTree"
          })
        );
      }
      if (routes.isEditRoute(route)) {
        return of(
          pageChange({
            route,
            splyt: null
          }),
          fetchSplyt(route.id)
        );
      }
      return empty();
    })
  );

const navigateEpic: ApplicationEpic = action$ =>
  action$.pipe(
    filter(action => action.type === ActionTypes.Navigate),
    switchMap(action => {
      window.history.pushState(
        null,
        "",
        routes.toUrl((action as Navigate).payload)
      );
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
    filter(action => action.type === ActionTypes.FetchSplyt),
    switchMap(action => {
      return from(backend.fetchSplyt((action as FetchSplyt).payload)).pipe(
        map(splyt => fetchSplytResponse(splyt))
      );
    })
  );

const saveTree = (tree: Tree) => {
  localStorage.setItem("splytstate", JSON.stringify(tree));
};

const retrieveTree = (): Tree => {
  try {
    const tree = JSON.parse(localStorage.getItem("splytstate") || "1");
    if (!tree || !tree.size) {
      throw new Error("Not a tree!");
    }
    return tree;
  } catch (err) {
    return splyt.initialTree;
  }
};

const saveNewTreeInLocalStorageEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.ChangeNewTree),
    delay(200),
    switchMap(action => {
      localStorage.setItem(
        "splytstate",
        JSON.stringify(
          state$.value.page && routes.isNewRoute(state$.value.page.route)
            ? undoable.current((state$.value.page as state.NewPage).tree)
            : {}
        )
      );
      return empty() as Observable<Action>;
    })
  );

const translator = shortUuid();

const saveNewTreeEpic: ApplicationEpic = action$ =>
  action$.pipe(
    filter(action => action.type === ActionTypes.SaveNewTree),
    switchMap(action => {
      const payload = (action as SaveNewTree).payload;
      return from(
        backend.createSplyt({
          treeId: translator.new(),
          tree: payload.tree,
          name: payload.name,
          isPublic: payload.isPublic,
          createdAt: new Date().toISOString()
        })
      ).pipe(
        switchMap(splyt =>
          from([
            saveNewTreeResponse(splyt),
            navigate(routes.editRoute(splyt.treeId))
          ])
        )
      );
    })
  );

const cloneTreeEpic: ApplicationEpic = action$ =>
  action$.pipe(
    filter(action => action.type === ActionTypes.CloneTree),
    switchMap(action => {
      saveTree((action as CloneTree).payload);
      return of(navigate(routes.newRoute));
    })
  );

const mainEpic: ApplicationEpic = combineEpics(
  initializeEpic,
  navigateEpic,
  fetchSplytsEpic,
  saveNewTreeInLocalStorageEpic,
  fetchSplytEpic,
  cloneTreeEpic,
  saveNewTreeEpic
);

// ## Store

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
