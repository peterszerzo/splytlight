import {createElement} from 'react';
import classNames from 'classnames';
const {div} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import StaticContent from '../static-content';

export default ({isActive, content}) => {
  return (
    div({
      className: classNames(cls.container, {
        [cls.active]: isActive
      })
    },
      StaticContent({content})
    )
  );
};
