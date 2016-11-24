import {createElement} from 'react';
const {div} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import Editor from '../editor';
import EditorNav from '../editor-nav';
import Overlay from '../overlay';
import Nav from '../nav';
import textContent from '../../../content/text';
import Header from '../header';

export default ({state, setState}) => (
  div({
    className: cls.root
  },
    Header(),
    Overlay({
      isActive: state.route === 'about',
      content: textContent.about
    }),
    Nav({state, setState}),
    div({
      className: cls.main
    },
      div({
        className: cls.viz
      },
        Editor({
          state,
          setState: (treeStateChange) => {
            return setState({
              tree: Object.assign({}, state.tree, treeStateChange)
            });
          }
        })
      ),
      div({
        className: cls.viz,
        id: '3d'
      }),
      EditorNav({state})
    )
  )
);
