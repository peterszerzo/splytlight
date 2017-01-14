import {
  WebGLRenderer,
  Scene,
  Vector3,
  Box3,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  AxisHelper,
  Mesh,
  MeshLambertMaterial,
  CircleGeometry
} from 'three'
import getVizContainerDimensions from '../../utilities/layout'
import create from './splyt'
import { blue, white } from '../../constants/styling'

export default (container, initialState) => {
  let state = initialState

  /* Environment */

  const axisHelper = new AxisHelper(50)

  const planeGeometry = new CircleGeometry(50, 40)
  const planeMaterial = new MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    side: DoubleSide
  })

  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.receiveShadow = true
  plane.rotation.x = -Math.PI / 2
  plane.position.set(0, 0, 0)

  /* Lights */

  const lights = (function () {
    const light1 = new DirectionalLight(white, 0.2)
    light1.position.set(10, 10, 10)

    const light2 = new DirectionalLight(white, 0.2)
    light2.position.set(-10, -10, -10)

    const light3 = new AmbientLight(blue)

    return [light1, light2, light3]
  }())

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

  const renderer = new WebGLRenderer({antialias: true})
  renderer.setClearColor(0xffffff, 1)
  renderer.shadowMap.enabled = true

  function render (node) {
    renderer.render(scene, camera)
  }

  /* Update */

  function resize ({width, height}, {x, y}, cameraAngle) {
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.position.set(
      (x + y) * 1.2 * Math.sin(cameraAngle),
      (x + y) * 1.2,
      (x + y) * 1.2 * Math.cos(cameraAngle)
    )
    camera.lookAt(new Vector3(0, (x + y) * 0.3), 0)
    camera.updateProjectionMatrix()
  }

  let model
  let modelBounds

  function setModel (tree) {
    if (model) {
      scene.remove(model)
    }
    model = create(tree)
    scene.add(model)
    modelBounds = new Box3().setFromObject(model)
    return model
  }

  function update (newState) {
    let prevState = state
    state = newState
    console.log(state.drag)
    if (state.global.ui.windowWidth === 0 || state.global.ui.windowHeight === 0) {
      return
    }
    const cameraAngle = (state.drag.totalFinalized[0] + state.drag.current[0]) / 1000
    if (prevState.global.tree !== state.global.tree || !model) {
      setModel (state.global.tree)
    }
    const { min, max } = modelBounds
    resize(getVizContainerDimensions(state.global.ui), {
      x: Math.abs(min.x - max.x),
      y: Math.abs(min.y - max.y)
    }, cameraAngle)
    render()
  }

  render()
  update(initialState)
  container.appendChild(renderer.domElement)

  return {
    render,
    update
  }
}
