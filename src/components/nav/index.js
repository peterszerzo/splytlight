import {createElement} from 'react';
import classNames from 'classnames';
const {div, header, h1, span, a, nav} = require('hyperscript-helpers')(createElement);

import cls from './style.css';

export default ({state}) => (
  nav({
    className: cls.container
  }, [
    div({
      className: cls.toggle
    }, span({}, 'About')),
    div({
      className: classNames(cls.panel)
    })
  ])
);
