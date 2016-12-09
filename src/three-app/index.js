import { render, renderer } from './render'
import createControls from './controls'
import update from './update'

export function start (state) {
  const container = document.getElementById('3d')
  container.appendChild(renderer.domElement)
  createControls(container).addEventListener('change', render)
  render()
  update(state)
}

export { default as update } from './update'
