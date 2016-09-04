import {Group} from 'three';

import {splyt} from '../../constants/geometries';
import createSplytUnit from './unit';

function xformSplyt(object, size, direction){
  const armLength = size.armLength;
  const bHeight = size.baseHeight;
  const armAngle = size.armAngle;
  if (direction === 'left') {
    object.rotateZ(Math.PI / 2 - armAngle);
    object.position.set( - 0.5 * armLength, bHeight + 0.5 * armLength * Math.sqrt(3), 0);
  }
  else{
    object.rotateZ(- (Math.PI / 2 - armAngle));
    object.position.set( + 0.5 * armLength, bHeight + 0.5 * armLength * Math.sqrt(3), 0);
  }
}

function createSplytTree(group, state) {
  if (!state || (state.status === 'adding')) {
    return group;
  } else {
    const leftGroup = createSplytTree(new Group(), state.left);
    xformSplyt(leftGroup, splyt[state.size], 'left');
    const rightGroup = createSplytTree(new Group(), state.right);
    xformSplyt(rightGroup, splyt[state.size], 'right');
    group.add(leftGroup);
    group.add(rightGroup);
    group.add(createSplytUnit(splyt[state.size]));
    return group;
  }
}

export default function create(tree) {
  return createSplytTree(new Group(), tree);
}
