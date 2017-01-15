import { Group } from 'three'

import * as splyt from '../../../constants/geometries'
import createSplytUnit from './unit'

const { sin, cos } = Math

function transformSplyt (object, dimensions, direction) {
  const {baseHeight} = dimensions
  const {angle, length} = dimensions[direction + 'Arm']
  object.rotateZ(angle)
  object.position.set(
    -length * sin(angle),
    baseHeight + length * cos(angle),
    0
  )
}

function createSplytTree (state) {
  if (!state || (state.status === 'adding')) {
    return new Group()
  } else {
    const leftGroup = createSplytTree(state.left)
    transformSplyt(leftGroup, splyt[state.size], 'left')
    const rightGroup = createSplytTree(state.right)
    transformSplyt(rightGroup, splyt[state.size], 'right')
    const group = new Group()
    group.add(leftGroup)
    group.add(rightGroup)
    group.add(createSplytUnit(splyt[state.size]))
    return group
  }
}

export default function create (tree) {
  const obj = createSplytTree(tree)
  return obj
}
