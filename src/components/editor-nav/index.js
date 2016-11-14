import {createElement} from 'react';
const {div, header, h1, span} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import Editor from '../editor';
import Dashboard from '../dashboard';

export default () => (
  div({
    className: cls.container
  }, [
    div({
      className: cls.button
    }, span({}, '➜')),
    div({
      className: cls.button
    }, span({}, '✉')),
    div({
      className: cls.button
    }, span({}, 'k'))
  ])
);
