import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from "three"

import * as splyt from "../../../constants/geometries"
import createSplytUnit from "./unit"

const { sin, cos } = Math

function transformSplyt(object, dimensions, direction, rotation) {
  const { baseHeight } = dimensions
  const { angle, length } = dimensions[direction + "Arm"]
  object.rotateZ(angle)
  object.rotateY(rotation)
  object.position.set(-length * sin(angle), baseHeight + length * cos(angle), 0)
}

export default function createSplytTree(state) {
  if (!state || state.status === "adding") {
    const emptyGroup = new Group()
    const sphereGeometry = new SphereGeometry(12, 16, 16)
    const sphereMaterial = new MeshBasicMaterial({ color: 0xffc235 })
    const sphereMesh = new Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.translateY(13)
    emptyGroup.add(sphereMesh)
    return emptyGroup
  } else {
    const leftGroup = createSplytTree(state.left)
    transformSplyt(leftGroup, splyt[state.size], "left", state.rotation)
    const rightGroup = createSplytTree(state.right)
    transformSplyt(rightGroup, splyt[state.size], "right", state.rotation)
    const group = new Group()
    group.add(leftGroup)
    group.add(rightGroup)
    group.add(createSplytUnit(splyt[state.size]))
    return group
  }
}
