import { Vector3, Box3 } from 'three'
import { renderer, render } from './render'
import camera from './camera'
import scene from './scene'
import getVizContainerDimensions from '../utilities/layout'
import create from './splyt'

function resize ({width, height}, {x, y}) {
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.position.set(0, (x + y) * 1.2, (x + y) * 1.2)
  camera.lookAt(new Vector3(0, (x + y) * 0.8, (x + y) * 0.8))
  camera.updateProjectionMatrix()
}

let oldGroup

function addSplyt (tree) {
  if (oldGroup) {
    scene.remove(oldGroup)
  }
  const group = create(tree)
  oldGroup = group
  scene.add(group)
  return group
}

export default function update (state) {
  if (state.ui.windowWidth === 0 || state.ui.windowHeight === 0) {
    return
  }
  const obj = addSplyt(state.tree)
  const { min, max } = new Box3().setFromObject(obj)
  resize(getVizContainerDimensions(state.ui), {
    x: Math.abs(min.x - max.x),
    y: Math.abs(min.y - max.y)
  })
  render()
}
