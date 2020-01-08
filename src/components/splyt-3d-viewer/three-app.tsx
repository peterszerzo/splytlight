import {
  WebGLRenderer,
  Group,
  Scene,
  Vector3,
  Box3,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  AxesHelper,
  Mesh,
  MeshLambertMaterial,
  CircleGeometry
} from "three";
import create from "./splyt";
import * as styles from "../../styles";
import { Tree } from "../../splyt";

type Pt = [number, number];

export interface Size {
  width: number;
  height: number;
}

export interface ThreeAppState {
  tree: Tree;
  activePath: string | null;
  size: Size;
  drag: Pt;
}

const createThreeApp = (
  container: HTMLElement,
  initialState: ThreeAppState
) => {
  let state: ThreeAppState = initialState;

  /* Environment */

  const axisHelper = new AxesHelper(50);

  const planeGeometry = new CircleGeometry(50, 40);
  const planeMaterial = new MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    side: DoubleSide
  });

  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, 0, 0);

  /* Lights */

  const lights = (() => {
    const light1 = new DirectionalLight(styles.white, 0.2);
    light1.position.set(10, 10, 10);

    const light2 = new DirectionalLight(styles.white, 0.2);
    light2.position.set(-10, -10, -10);

    const light3 = new AmbientLight(styles.white);

    return [light1, light2, light3];
  })();

  /* Scene */

  const scene = new Scene();

  if (false && process.env.NODE_ENV === "development") {
    scene.add(axisHelper);
    scene.add(plane);
  }

  lights.forEach(light => {
    scene.add(light);
  });

  /* Camera */

  const camera = new PerspectiveCamera(
    45,
    undefined, // Set subsequently in update
    10,
    10000
  );
  camera.up = new Vector3(0, -1, 0);
  camera.position.set(0, 300, 300);

  /* Renderer */

  const renderer = new WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true
  });
  renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = true;

  function render() {
    renderer.render(scene, camera);
  }

  /* Update */

  function resize(
    {
      width,
      height
    }: {
      width: number;
      height: number;
    },
    {
      x,
      y
    }: {
      x: number;
      y: number;
    },
    cameraAngle: number
  ) {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.set(
      (x + y) * 1.2 * Math.sin(cameraAngle),
      (x + y) * 0.8,
      (x + y) * 1.2 * Math.cos(cameraAngle)
    );
    camera.lookAt(new Vector3(0, (x + y) * 0.45), 0);
    camera.updateProjectionMatrix();
  }

  let model: Group | undefined;
  let modelBounds: Box3 | undefined;

  const setModel= (tree: Tree, options: {
    activePath: string | null
  }) => {
    if (model) {
      scene.remove(model);
    }
    model = create(tree, options);
    scene.add(model);
    modelBounds = new Box3().setFromObject(model);
    return model;
  }

  const update = (newState: ThreeAppState) => {
    let prevState = state;
    state = newState;
    if (state.size.width === 0 || state.size.height === 0) {
      return;
    }
    const cameraAngle = state.drag[0] / 200;
    if (prevState.tree !== state.tree || prevState.activePath !== state.activePath || !model) {
      setModel(state.tree, {
        activePath: state.activePath
      });
    }
    if (modelBounds) {
      console.log(modelBounds);
      const { min, max } = modelBounds;
      resize(
        state.size,
        {
          x: Math.abs(min.x - max.x),
          y: Math.abs(min.y - max.y)
        },
        cameraAngle
      );
    }
    render();
  }

  render();
  update(initialState);
  container.appendChild(renderer.domElement);

  return {
    render,
    update
  };
};

export type ThreeApp = ReturnType<typeof createThreeApp>;

export default createThreeApp;
