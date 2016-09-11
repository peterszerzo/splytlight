import THREE from 'three';

import camera from './camera';

const OrbitControls = require('three-orbit-controls')(THREE);

export default function createControls(container) {
  const controls = new OrbitControls(camera, container);
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 4;
  return controls;
}
