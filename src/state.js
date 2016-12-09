const subscribers = []

let state = {
  tree: {
    id: 'b',
    size: 'small',
    status: 'added'
  },
  route: '',
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
}

export function set (stateChange) {
  state = Object.assign({}, state, stateChange)
  subscribers.forEach(subscriber => {
    subscriber(state)
  })
}

export function get () {
  return state
}

export function subscribe (subscriber) {
  subscribers.push(subscriber)
}
