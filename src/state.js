// @flow
import { createStore } from 'redux'

type Tree = {
  size: string,
  status: string,
  left: ?Tree,
  right: ?Tree
}

type State = {
  +tree: Tree,
  +currentSize: 'small' | 'large',
  +route: '',
  +ui: {
    +windowHeight: number,
    +windowWidth: number
  }
}

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

type Action = RawStateChange | Resize

function rawStateChange (stateChange: Object): Action {
  return {
    type: 'rawStateChange',
    payload: stateChange
  }
}

const initialState: State = {
  tree: {
    size: 'small',
    status: 'added',
    left: null,
    right: null
  },
  currentSize: 'small',
  route: '',
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
}

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
    default:
      (action: empty)
      return state
  }
}

const store = createStore(reducer)

export function set (stateChange: Object) {
  store.dispatch(rawStateChange(stateChange))
}

export function get () {
  return store.getState()
}

export const subscribe = function (next: Function) {
  store.subscribe(() => {
    next(store.getState())
  })
}
