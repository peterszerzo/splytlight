import {createElement} from 'react';
const {g, line, circle} = require('hyperscript-helpers/dist/svg')(createElement);

import {splyt} from '../../constants/geometries';
import {
  getEndPoints,
  getStartPoint,
  getMidPoint
} from '../../utilities/splyt.js';
import {
  brown,
  green,
  red,
  blue,
  strokeWeight,
  controlCircleRadius
} from '../../constants/styling';

const fillByControlStatus = {
  neutral: brown,
  adding: green,
  removing: red,
  added: brown
};

export default function Unit(state, callbacks) {
  return (
    g({},
      Lines(state),
      Controls(state, callbacks)
    )
  );
}

function Lines(state) {
  const [{x: xl, y: yl}, {x: xr, y: yr}] = getEndPoints(
    splyt[state.size], {
      useOffset: true
    }
  );
  const {x: x0, y: y0} = getStartPoint(
    splyt[state.size], {
      useOffset: true
    }
  );
  const {x: xm, y: ym} = getMidPoint(
    splyt[state.size]
  );
  return (
    g({
      stroke: blue,
      strokeWidth: strokeWeight,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    },
      line({
        x1: x0,
        y1: y0,
        x2: xm,
        y2: ym
      }),
      line({
        x1: xm,
        y1: ym,
        x2: xl,
        y2: yl
      }),
      line({
        x1: xm,
        y1: ym,
        x2: xr,
        y2: yr
      })
    )
  );
}

function ControlCircle(point, controlStatus, {
  onClick,
  onMouseOver,
  onMouseOut
}) {
  return (
    g({
      transform: `translate(${point.x} ${point.y})`,
      fill: fillByControlStatus[controlStatus],
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      onClick,
      onMouseOver,
      onMouseOut
    },
      circle({
        cx: 0,
        cy: 0,
        r: controlCircleRadius
      })
    )
  );
}

function Controls(state, {
  onControlClick,
  onControlMouseEnter,
  onControlMouseLeave
}) {
  const [leftPoint, rightPoint] = getEndPoints(
    splyt[state.size],
    {
      useOffset: false
    }
  );
  return (
    g({
      stroke: 'none'
    },
      ControlCircle(leftPoint, state.left ? state.left.status : 'neutral', {
        onClick: onControlClick.bind(this, 'left'),
        onMouseOver: onControlMouseEnter.bind(this, 'left'),
        onMouseOut: onControlMouseLeave.bind(this, 'left')
      }),
      ControlCircle(rightPoint, state.right ? state.right.status : 'neutral', {
        onClick: onControlClick.bind(this, 'right'),
        onMouseOver: onControlMouseEnter.bind(this, 'right'),
        onMouseOut: onControlMouseLeave.bind(this, 'right')
      })
    )
  );
}
