import { AmbientLight, DirectionalLight } from 'three'
import { blue, white } from '../../constants/styling'

const light1 = new DirectionalLight(white, 0.2)
light1.position.set(10, 10, 10)

const light2 = new DirectionalLight(white, 0.2)
light2.position.set(-10, -10, -10)

const light3 = new AmbientLight(blue)

export default [light1, light2, light3]
