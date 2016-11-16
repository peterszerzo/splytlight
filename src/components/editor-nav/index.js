import {createElement} from 'react';
const {div} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import IconButton from '../icon-button';

export default ({state}) => (
  div({
    className: cls.container
  },
    IconButton({
      unicodeIcon: '→'
    }),
    IconButton({
      unicodeIcon: '⤒'
    }),
    IconButton({
      unicodeIcon: '⤓',
      href: `data:application/octet-stream;type=,${JSON.stringify(state.tree)}`
    })
  )
);
