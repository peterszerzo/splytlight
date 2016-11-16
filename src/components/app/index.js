import {createElement} from 'react';
const {div, header, h1} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import Editor from '../editor';
import EditorNav from '../editor-nav';
import Overlay from '../overlay';
import Nav from '../nav';
import textContent from '../../../content/text';

export default ({state, setState}) => (
  div({
    className: cls.root
  },
    header({
      className: cls.header
    }, h1({}, 'Splyt Light Interactive')),
    Overlay({
      isActive: state.route === 'about',
      content: textContent.about
    }),
    Nav({state, setState}),
    div({
      className: cls.main
    }, [
      div({
        className: cls.viz
      },
        Editor(state, {
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
    ])
  )
);
