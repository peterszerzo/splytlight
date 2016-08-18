import defaultState from './default.json';

import type {State} from './types';

const subscribers = [];

let state : State = defaultState;

export function setState(stateChange : Object) {
  state = Object.assign({}, state, stateChange);
  subscribers.forEach((subscriber) => {
    subscriber(state);
  });
}

export function getState() : State {
  return state;
}

export function setChildState({state: parentState, setState: setParentState}, childKey) {
  return function(stateChange) {
    setParentState({
      [childKey]: Object.assign({}, parentState[childKey], stateChange)
    });
  };
}

export function subscribe(subscriber : Function) {
  subscribers.push(subscriber);
}
