import {
  PerspectiveCamera,
  Vector3
} from 'three';

const camera = new PerspectiveCamera(
  45,
  2,
  0.1,
  10000
);
camera.position.set(200, 200, 300);
camera.lookAt(new Vector3(0, 5000, 0));

export default camera;
