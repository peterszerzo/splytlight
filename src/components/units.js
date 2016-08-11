import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants';
import Unit from './unit';
import data from '../fixtures/simple.json';

const unitGeometry = {
  baseHeight: 40,
  armLength: 30,
  armAngle: Math.PI / 4
};

export default function Units({x, y}) {
  const baseTranslation = {
    x: x / 2,
    y: y / 10
  };
  return (
    h('svg', {namespace: svgNameSpace, attributes: {viewBox: `0 0 ${x} ${y}`}}, [
      h('g', {namespace: svgNameSpace}, [
        Unit(unitGeometry, {x: baseTranslation.x, y: baseTranslation.y})
      ])
    ])
  );
}
