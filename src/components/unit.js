import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';

import {splytUnit} from '../constants/geometries';

const offset = 12;

function Controls({addLeft, addRight}) {
  const {baseHeight, armLength, armAngle} = splytUnit;
  return (
    h('g', {namespace: svgNameSpace, attributes: {
      stroke: 'none',
      fill: 'rgba(32, 26, 22)',
    }}, [
      h('circle', {namespace: svgNameSpace, attributes: {
        cx: - armLength * Math.cos(armAngle),
        cy: baseHeight + armLength * Math.sin(armAngle),
        r: baseHeight / 4
      }, onclick: addRight}),
      h('circle', {namespace: svgNameSpace, attributes: {
        cx: + armLength * Math.cos(armAngle),
        cy: baseHeight + armLength * Math.sin(armAngle),
        r: baseHeight / 4
      }, onclick: addLeft})
    ])
  );
}

function Lines() {
  const {baseHeight, armLength, armAngle} = splytUnit;
  return (
    h('g', {namespace: svgNameSpace, attributes: {
      stroke: '#638FBE',
      'stroke-width': '6',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }}, [
      h('line', {namespace: svgNameSpace, attributes: {
        x1: 0,
        y1: offset / 2,
        x2: 0,
        y2: baseHeight
      }}),
      h('line', {namespace: svgNameSpace, attributes: {
        x1: 0,
        y1: baseHeight,
        x2: - (armLength - offset / 2) * Math.cos(armAngle),
        y2: baseHeight + (armLength - offset / 2) * Math.sin(armAngle)
      }}),
      h('line', {namespace: svgNameSpace, attributes: {
        x1: 0,
        y1: baseHeight,
        x2: + (armLength - offset / 2) * Math.cos(armAngle),
        y2: baseHeight + (armLength - offset / 2) * Math.sin(armAngle)
      }})
    ])
  );
}

export default function Unit({addLeft, addRight}) {
  return (
    h('g', {namespace: svgNameSpace}, [
      Lines(),
      Controls({addLeft, addRight})
    ])
  );
}
