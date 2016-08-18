import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import UnitLines from './unit-lines';
import UnitControls from './unit-controls';

export default function Unit(state, callbacks) {
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        opacity: state.status === 'added' ? 1 : .5
      }
    }, [
      UnitLines(),
      state.status === 'added' ? UnitControls(state, callbacks) : null
    ])
  );
}
