import {createElement} from 'react';
import marked from 'marked';
const {div} = require('hyperscript-helpers')(createElement);

import cls from './style.css';

export default ({content}) => {
  return (
    div({
      className: cls.container,
      dangerouslySetInnerHTML: {__html: marked(content)}
    })
  );
};
