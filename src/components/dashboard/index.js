import {createElement} from 'react';
const {div, p, button} = require('hyperscript-helpers')(createElement);
import classNames from 'classnames';

import cls from './style.css';
import {countUnits, countLooseEnds} from '../../utilities/splyt';

export default (tree) => {
  return (
    div({
      className: cls.panel
    }, [
      p({}, `Units: ${countUnits(tree)}`),
      p({}, `Bulbs: ${countLooseEnds(tree)}`)
    ])
  );
};
