import {Group} from 'three';

import {splyt} from '../../constants/geometries';
import createSplytUnit from './unit';

const {PI, sin, cos} = Math;

function transformSplyt(object, size, direction){
  const armLength = size.armLength;
  const bHeight = size.baseHeight;
  const armAngle = size.armAngle;
  if (direction === 'left') {
    object.rotateZ(PI / 2 - armAngle);
    object.position.set(
      - armLength * cos(armAngle),
      bHeight + armLength * sin(armAngle),
      0
    );
  } else {
    object.rotateZ(- (PI / 2 - armAngle));
    object.position.set(
      armLength * cos(armAngle),
      bHeight + armLength * sin(armAngle),
      0
    );
  }
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
