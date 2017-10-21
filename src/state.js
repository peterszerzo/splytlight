import { createStore, applyMiddleware } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { Observable } from "rxjs"
import "rxjs/add/observable/of"
import "rxjs/add/operator/mapTo"
import "rxjs/add/operator/delay"

// State

const initialTree = {
  size: "small",
  status: "added",
  left: null,
  right: null
}

const initialState = {
  tree: initialTree,
  currentSize: "small",
  route: "/",
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
}

// Actions

export function rawStateChange(stateChange) {
  return {
    type: "rawStateChange",
    payload: stateChange
  }
}

export function fetchTreeRequest() {
  return {
    type: "fetchTreeRequest"
  }
}

export function changeTree(newTree) {
  return {
    type: "changeTree",
    payload: newTree
  }
}

export function navigate(newRoute) {
  return {
    type: "navigate",
    payload: newRoute
  }
}

// Reducers

function reducer(state = initialState, action) {
  switch (action.type) {
    case "rawStateChange":
      return Object.assign({}, state, action.payload)
    case "resize":
      return Object.assign({}, state, {
        ui: {
          windowWidth: action.payload.width,
          windowHeight: action.payload.height
        }
      })
    case "fetchTreeRequest":
      return state
    case "fetchTreeResponse":
      return Object.assign({}, state, {
        tree: action.payload
      })
    case "changeTree":
      const newTree = Object.assign({}, state.tree, action.payload)
      localStorage.setItem("splytstate", JSON.stringify(newTree))
      return Object.assign({}, state, {
        tree: newTree
      })
    case "navigate":
      global.history.pushState(null, null, action.payload)
      return Object.assign({}, state, {
        route: action.payload
      })
    default:
      // eslint-disable-next-line
      ;(action: empty)
      return state
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
        payload: (function() {
          try {
            const tree = JSON.parse(localStorage.getItem("splytstate") || "1")
            if (!tree || !tree.size) {
              throw new Error("Not a tree!")
            }
            return tree
          } catch (err) {
            return initialTree
          }
        })()
      })
    )

// Store

export const store = createStore(
  reducer,
  applyMiddleware(createEpicMiddleware(fetchTreeEpic))
)
