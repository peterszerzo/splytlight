import {createElement} from 'react';
const {div, header, h1, span, a} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import Editor from '../editor';
import Dashboard from '../dashboard';

export default ({state}) => (
  div({
    className: cls.container
  }, [
    div({
      className: cls.button
    }, span({}, '→')),
    div({
      className: cls.button
    }, span({}, '⤒')),
    a({
      className: cls.button,
      href: `data:application/octet-stream;type=,${JSON.stringify(state.tree)}`
    }, span({}, '⤓'))
  ])
);
