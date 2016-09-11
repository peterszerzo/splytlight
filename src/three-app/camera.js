import {
  PerspectiveCamera
} from 'three';

const camera = new PerspectiveCamera(
  45,
  2,
  0.1,
  10000
);
camera.position.set(200, 600, 300);

export default camera;
