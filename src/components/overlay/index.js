import {createElement} from 'react';
import classNames from 'classnames';
import marked from 'marked';
const {div} = require('hyperscript-helpers')(createElement);

import cls from './style.css';

export default ({isActive, content}) => {
  return (
    div({
      className: classNames(cls.container, {
        [cls.active]: isActive
      }),
      dangerouslySetInnerHTML: {__html: marked(content)}
    })
  );
};
