import { WebGLRenderer } from 'three'
import scene from './scene'
import camera from './camera'

export const renderer = new WebGLRenderer({antialias: true})
renderer.setClearColor(0xffffff, 1)
renderer.shadowMap.enabled = true

export function render () {
  renderer.render(scene, camera)
}
