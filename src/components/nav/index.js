import {createElement} from 'react';
import classNames from 'classnames';
const {div, span, nav} = require('hyperscript-helpers')(createElement);

import cls from './style.css';

export default ({state, setState}) => (
  nav({
    className: cls.container
  },
    div({
      className: cls.toggle
    }, span({
      onClick: () => {
        console.log(state);
        setState({route: state.route === 'about' ? '' : 'about'});
      }
    }, 'About')),
    div({
      className: classNames(cls.panel)
    })
  )
);
