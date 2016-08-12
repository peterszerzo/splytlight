import defaultState from './default.json';

const subscribers = [];

let state = defaultState;

export function setState(stateChange) {
  state = Object.assign({}, state, stateChange);
  subscribers.forEach((subscriber) => {
    subscriber(state);
  });
}

export function getState() {
  return state;
}

export function subscribe(subscriber) {
  subscribers.push(subscriber);
}
