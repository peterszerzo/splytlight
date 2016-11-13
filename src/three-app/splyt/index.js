import {Group} from 'three';

import {splyt} from '../../constants/geometries';
import createSplytUnit from './unit';

const {PI, sin, cos} = Math;

function transformSplyt(object, size, direction) {
  const {baseHeight} = size;
  const {angle, length} = size[direction + 'Arm'];
  object.rotateZ(- angle);
  object.position.set(
    length * sin(angle),
    baseHeight + length * cos(angle),
    0
  );
}

function createSplytTree(group, state) {
  if (!state || (state.status === 'adding')) {
    return group;
  } else {
    const leftGroup = createSplytTree(new Group(), state.left);
    transformSplyt(leftGroup, splyt[state.size], 'left');
    const rightGroup = createSplytTree(new Group(), state.right);
    transformSplyt(rightGroup, splyt[state.size], 'right');
    group.add(leftGroup);
    group.add(rightGroup);
    group.add(createSplytUnit(splyt[state.size]));
    return group;
  }
}

export default function create(tree) {
  const obj = createSplytTree(new Group(), tree);
  return obj;
}
