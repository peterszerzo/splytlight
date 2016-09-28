import {controlCircleOffset} from '../constants/styling';

export function getEndPoints({baseHeight, armLength, armAngle}, options) {
  const offset = (options && options.useOffset) ? controlCircleOffset : 0;
  return [
    {
      x: - (armLength - offset / 2) * Math.cos(armAngle),
      y: baseHeight + (armLength - offset / 2) * Math.sin(armAngle)
    },
    {
      x: + (armLength - offset / 2) * Math.cos(armAngle),
      y: baseHeight + (armLength - offset / 2) * Math.sin(armAngle)
    }
  ];
}

export function getStartPoint({baseHeight, armLength, armAngle}, options) {
  const offset = (options && options.useOffset) ? controlCircleOffset : 0;
  return {
    x: 0,
    y: offset / 2
  };
}

export function getMidPoint({baseHeight, armLength, armAngle}) {
  return {
    x: 0,
    y: baseHeight
  };
}

export function countUnits(tree) {
  if (!tree || ['added', 'removing'].indexOf(tree.status) === -1) {
    return 0;
  }
  return 1 + countUnits(tree.left) + countUnits(tree.right);
}

export function countLooseEnds(tree) {
  if (!tree || ['added', 'removing'].indexOf(tree.status) === -1) {
    return 1;
  }
  return countLooseEnds(tree.left) + countLooseEnds(tree.right);
}

/*
 * This method reads DOM state to save the work of calculating the 2d bounding box.
 */
export function read2DSize() {
  const svg = document.getElementById('splyt-editor');
  const mainGroup = svg.children[0];
  const bBox = mainGroup.getBBox();
  return {
    x: bBox.width,
    y: bBox.height
  };
}
