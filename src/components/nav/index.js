import {createElement} from 'react';
import classNames from 'classnames';
const {div, span, nav, p} = require('hyperscript-helpers')(createElement);

import cls from './style.css';

export default ({state, setState}) => (
  nav({
    className: cls.container
  },
    div({
      className: cls.toggle
    }, span({
      onClick: () => {
        setState({route: state.route === 'about' ? '' : 'about'});
      }
    }, p({}, 'About'))),
    div({
      className: classNames(cls.panel)
    })
  )
);
