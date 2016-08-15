import defaultState from './default.json';

import type {Root} from './types';

const subscribers = [];

let state : Root = defaultState;

export function setState(stateChange : Object) {
  state = Object.assign({}, state, stateChange);
  subscribers.forEach((subscriber) => {
    subscriber(state);
  });
}

export function getState() : Root {
  return state;
}

export function subscribe(subscriber : Function) {
  subscribers.push(subscriber);
}
