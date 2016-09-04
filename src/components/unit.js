import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import UnitLines from './unit-lines';
import UnitControls from './unit-controls';

export default function Unit(state, callbacks) {
  return (
    h('g', {
      namespace: svgNameSpace
    }, [
      UnitLines(state),
      UnitControls(state, callbacks)
    ])
  );
}
