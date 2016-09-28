import THREE from 'three';

import camera from './camera';

const {PI} = Math;

const OrbitControls = require('three-orbit-controls')(THREE);

export default function createControls(container) {
  const controls = new OrbitControls(camera, container);
  controls.enableZoom = false;
  controls.minPolarAngle = PI / 4;
  controls.maxPolarAngle = PI / 4;
  return controls;
}
