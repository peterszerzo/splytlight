import {PerspectiveCamera} from 'three';

const camera = new PerspectiveCamera(
  45,
  null, // Set subsequently in update
  10,
  10000
);
camera.position.set(0, 300, 300);

export default camera;
