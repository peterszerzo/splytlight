import h from 'virtual-dom/h';

import {svgNameSpace} from '../../constants/strings';
import Lines from './lines';
import Controls from './controls';

export default function Unit(state, callbacks) {
  return (
    h('g', {
      namespace: svgNameSpace
    }, [
      Lines(state),
      Controls(state, callbacks)
    ])
  );
}
