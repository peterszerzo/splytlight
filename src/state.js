// @flow

type SplytUnitStatus = 'adding' | 'added' | 'removing';
type SplytUnitSize = 'small' | 'large';

type Ui = {
  windowWidth : number,
  windowHeight : number
};

type SplytTree = {
  id : string,
  status : SplytUnitStatus,
  size : SplytUnitSize,
  left? : SplytTree,
  right? : SplytTree
};

type State = {
  ui : Ui,
  route : string,
  tree : SplytTree,
  isDashboardExpanded : boolean
};

const subscribers : Array<Function> = [];

let state : State = {
  isDashboardExpanded: false,
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
};

export function set(stateChange : Object) {
  state = Object.assign({}, state, stateChange);
  subscribers.forEach((subscriber) => {
    subscriber(state);
  });
}

export function get() : State {
  return state;
}

export function subscribe(subscriber) {
  subscribers.push(subscriber);
}
