import h from 'virtual-dom/h';
const {div, h1} = require('hyperscript-helpers')(h);

import UnitsContainer from './units-container';

export default function App(state, {setState}) {
  return (
    div('.app', [
      div('.app__main', [
        div('.app__viz', [
          UnitsContainer(state, {
            setState: (treeStateChange) => {
              return setState({
                tree: Object.assign({}, state.tree, treeStateChange)
              });
            }
          })
        ]),
        div('.app__viz#3d')
      ]),
      div('.app__nav', [
        h1('Splyt Light Interactive')
      ])
    ])
  );
}
