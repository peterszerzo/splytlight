import {createElement} from 'react';
const {div, svg} = require('hyperscript-helpers')(createElement);
const {g} = require('hyperscript-helpers/dist/svg')(createElement);

import cls from './style.css';
import getContainerDimensions from '../../utilities/layout';
import Units from './units';

export default ({tree, ui}, {setState}) => {
  const {width, height} = getContainerDimensions(ui);
  return (
    div({
      className: cls.container
    },
      svg({
        id: 'splyt-editor',
        viewBox: `0 0 ${width} ${height}`
      }, [
        g({
          transform: `translate(${width / 2} ${height * 9 / 10}) rotate(${180})`
        }, [
          Units({
            state: tree
          }, {setState})
        ])
      ])
    )
  );
};
