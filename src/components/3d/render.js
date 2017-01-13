const THREE = require('three')
import { WebGLRenderer, Scene, Vector3, Box3, PerspectiveCamera } from 'three'
import orbitControls from 'three-orbit-controls'
import { axisHelper, plane } from './environment'
import lights from './lights'
import getVizContainerDimensions from '../../utilities/layout'
import create from './splyt'


/* Scene */

const scene = new Scene()

if (false && process.env.NODE_ENV === 'development') {
  scene.add(axisHelper)
  scene.add(plane)
}

lights.forEach((light) => {
  scene.add(light)
})


/* Camera */

const camera = new PerspectiveCamera(
  45,
  null, // Set subsequently in update
  10,
  10000
)
camera.position.set(0, 300, 300)


/* Renderer */

export const renderer = new WebGLRenderer({antialias: true})
renderer.setClearColor(0xffffff, 1)
renderer.shadowMap.enabled = true

export function render () {
  renderer.render(scene, camera)
}


/* Orbit controls */

const { PI } = Math
const OrbitControls = orbitControls(THREE)

export function createControls (container) {
  const controls = new OrbitControls(camera, container)
  controls.enableZoom = false
  controls.minPolarAngle = PI / 4
  controls.maxPolarAngle = PI / 4
  return controls
}


/* Update */

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

export function update (state) {
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
