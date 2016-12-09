import { Scene } from 'three'
import { axisHelper, plane } from './environment'
import lights from './lights'

const scene = new Scene()

if (process.env.NODE_ENV === 'development') {
  scene.add(axisHelper)
}
scene.add(plane)

lights.forEach((light) => {
  scene.add(light)
})

export default scene
