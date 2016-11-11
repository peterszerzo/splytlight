import h from 'react-hyperscript';

import Editor from './editor';
import Dashboard from './dashboard';

export default (state, {setState}) => (
  h('div.app', [
    h('header.app__header', [
      h('h1', {}, 'Splyt Light Interactive')
    ]),
    h('div.app__main', [
      h('div.app__viz', [
        Editor(state, {
          setState: (treeStateChange) => {
            return setState({
              tree: Object.assign({}, state.tree, treeStateChange)
            });
          }
        })
      ]),
      h('div.app__viz#3d'),
      Dashboard(state, {setState})
    ])
  ])
);
