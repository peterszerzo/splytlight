import {createElement} from 'react';
const {header, h1, div} = require('hyperscript-helpers')(createElement);

import cls from './style.css';

export default () => (
  header({
    className: cls.container
  },
    div({
      className: cls.logoContainer
    }),
    h1({}, 'Splyt Light Interactive')
  )
);
