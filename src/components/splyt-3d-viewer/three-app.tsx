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

  const resize = (
    {
      width,
      height
    }: {
      width: number;
      height: number;
    },
    bounds: Box3,
    [ cameraAngleXY, cameraAngleZ ]: [ number, number ]
  ) => {
    renderer.setSize(width, height);
    const maxAspect = width > height ? width / height : height / width;
    camera.aspect = width / height;
    const center = bounds.min
      .clone()
      .add(bounds.max)
      .multiplyScalar(0.5);
    const size = bounds.min.distanceTo(bounds.max);
    const cameraPosition = center
      .clone()
      .add(
        new Vector3(
          size * maxAspect * Math.cos(cameraAngleZ) * Math.sin(cameraAngleXY),
          -size * maxAspect * Math.sin(cameraAngleZ),
          size * maxAspect * Math.cos(cameraAngleZ) * Math.cos(cameraAngleXY)
        )
      );
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
  };

  let model: Group | undefined;
  let modelBounds: Box3 | undefined;

  const setModel = (
    tree: Tree,
    options: {
      activePath: string | null;
    }
  ) => {
    if (model) {
      scene.remove(model);
    }
    model = create(tree, options);
    scene.add(model);
    modelBounds = new Box3().setFromObject(model);
    return model;
  };

  const update = (newState: ThreeAppState) => {
    let prevState = state;
    state = newState;
    if (state.size.width === 0 || state.size.height === 0) {
      return;
    }
    const cameraAngle: [number, number] = [ state.drag[0] / 200, state.drag[1] / 200 ];
    if (
      prevState.tree !== state.tree ||
      prevState.activePath !== state.activePath ||
      !model
    ) {
      setModel(state.tree, {
        activePath: state.activePath
      });
    }
    if (modelBounds) {
      resize(state.size, modelBounds, cameraAngle);
    }
    render();
  };

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
