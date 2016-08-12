import h from 'virtual-dom/h';

import UnitsContainer from './units-container';
import {getState} from '../state';

export default function App() {
  return (
    h('div', {className: 'app'}, UnitsContainer({
      data: getState(),
      x: 500,
      y: 500
    }))
  );
}
