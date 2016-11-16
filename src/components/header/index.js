import {createElement} from 'react';
const {header, h1, div, svg} = require('hyperscript-helpers')(createElement);
const {use} = require('hyperscript-helpers/dist/svg')(createElement);

import cls from './style.css';

export default () => (
  header({
    className: cls.container
  },
    div({
      className: cls.logoContainer
    }, svg({}, use({
      xlinkHref: '#logo'
    }))),
    h1({}, 'Splyt Light Interactive')
  )
);
