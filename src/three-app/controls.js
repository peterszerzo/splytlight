const THREE = require('three')
import camera from './camera'
import orbitControls from 'three-orbit-controls'

const { PI } = Math
const OrbitControls = orbitControls(THREE)

export default function createControls (container) {
  const controls = new OrbitControls(camera, container)
  controls.enableZoom = false
  controls.minPolarAngle = PI / 4
  controls.maxPolarAngle = PI / 4
  return controls
}
