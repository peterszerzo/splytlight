import {createElement} from 'react';
const {div, p} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import {countUnits, countLooseEnds} from '../../utilities/splyt';

export default (tree) => {
  return (
    div({
      className: cls.panel
    },
      p({}, `Units: ${countUnits(tree)}`),
      p({}, `Bulbs: ${countLooseEnds(tree)}`)
    )
  );
};
