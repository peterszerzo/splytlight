import {createElement as h} from 'react';

import Lines from './lines';
import Controls from './controls';

export default function Unit(state, callbacks) {
  return (
    h('g', {}, [
      Lines(state),
      Controls(state, callbacks)
    ])
  );
}
