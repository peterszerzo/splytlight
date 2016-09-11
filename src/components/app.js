import h from 'virtual-dom/h';
const {div, h1, header} = require('hyperscript-helpers')(h);

import Editor from './editor';

export default function App(state, {setState}) {
  return (
    div('.app', [
      header('.app__header', [
        h1('Splyt Light Interactive')
      ]),
      div('.app__main', [
        div('.app__viz', [
          Editor(state, {
            setState: (treeStateChange) => {
              return setState({
                tree: Object.assign({}, state.tree, treeStateChange)
              });
            }
          })
        ]),
        div('.app__viz#3d')
      ])
    ])
  );
}
