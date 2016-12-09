import {controlCircleOffset} from '../constants/styling'

export function getEndPoints ({baseHeight, leftArm, rightArm}, options) {
  const offset = (options && options.useOffset) ? controlCircleOffset : 0
  return [
    {
      x: (leftArm.length - offset / 2) * Math.sin(leftArm.angle),
      y: baseHeight + (leftArm.length - offset / 2) * Math.cos(leftArm.angle)
    },
    {
      x: (rightArm.length - offset / 2) * Math.sin(rightArm.angle),
      y: baseHeight + (rightArm.length - offset / 2) * Math.cos(rightArm.angle)
    }
  ]
}

export function getStartPoint ({baseHeight, armLength, armAngle}, options) {
  const offset = (options && options.useOffset) ? controlCircleOffset : 0
  return {
    x: 0,
    y: offset / 2
  }
}

export function getMidPoint ({baseHeight, armLength, armAngle}) {
  return {
    x: 0,
    y: baseHeight
  }
}

export function countUnits (tree) {
  if (!tree || ['added', 'removing'].indexOf(tree.status) === -1) {
    return 0
  }
  return 1 + countUnits(tree.left) + countUnits(tree.right)
}

export function countLooseEnds (tree) {
  if (!tree || ['added', 'removing'].indexOf(tree.status) === -1) {
    return 1
  }
  return countLooseEnds(tree.left) + countLooseEnds(tree.right)
}
