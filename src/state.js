// @flow
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/delay'
import { log } from './utils'

// State

type Route = 'home' | 'about'

type Tree = {
  size: string,
  status: string,
  left: ?Tree,
  right: ?Tree
}

type State = {
  +tree: Tree,
  +currentSize: 'small' | 'large',
  +route: Route,
  +ui: {
    +windowHeight: number,
    +windowWidth: number
  }
}

const initialTree: Tree = {
  size: 'small',
  status: 'added',
  left: null,
  right: null
}

const initialState: State = {
  tree: initialTree,
  currentSize: 'small',
  route: 'home',
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
}

// Actions

type RawStateChange = {
  type: 'rawStateChange',
  payload: Object
}

type Resize = {
  type: 'resize',
  payload: {
    +height: number,
    +width: number
  }
}

type FetchTreeRequest = {
  type: 'fetchTreeRequest'
}

type FetchTreeResponse = {
  type: 'fetchTreeResponse',
  payload: Tree
}

type ChangeTree = {
  type: 'changeTree',
  payload: Tree
}

type Action = RawStateChange | Resize | FetchTreeRequest | FetchTreeResponse | ChangeTree

export function rawStateChange (stateChange: Object): Action {
  return {
    type: 'rawStateChange',
    payload: stateChange
  }
}

export function fetchTreeRequest (): Action {
  return {
    type: 'fetchTreeRequest'
  }
}

export function changeTree (newTree: Tree): Action {
  return {
    type: 'changeTree',
    payload: newTree
  }
}

// Reducers

function reducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'rawStateChange':
      return Object.assign({}, state, action.payload)
    case 'resize':
      return Object.assign({}, state, {
        ui: {
          windowWidth: action.payload.width,
          windowHeight: action.payload.height
        }
      })
    case 'fetchTreeRequest':
      return state
    case 'fetchTreeResponse':
      return Object.assign({}, state, {
        tree: action.payload
      })
    case 'changeTree':
      const newTree = Object.assign({}, state.tree, action.payload)
      localStorage.setItem('splytstate', JSON.stringify(newTree))
      return Object.assign({}, state, {
        tree: newTree
      })
    default:
      (action: empty)
      return state
  }
}

// Epics

const fetchTreeEpic = action$ =>
  action$.ofType('fetchTreeRequest')
    .delay(10)
    .switchMap(() => (
      Observable.of({
        type: 'fetchTreeResponse',
        payload: (function() {
          try {
            const tree = JSON.parse(localStorage.getItem('splytstate') || '1')
            if (!tree || !tree.size) {
              throw new Error('Not a tree!')
            }
            return tree
          } catch (err) {
            return initialTree
          }
        }())
      })
    ))

// Store

export const store = createStore(
  reducer,
  applyMiddleware(createEpicMiddleware(fetchTreeEpic))
)
