import THREE from 'three';

import camera from './camera';

const OrbitControls = require('three-orbit-controls')(THREE);

const controls = new OrbitControls(camera);

controls.enableZoom = false;
controls.minPolarAngle = 3.14/4;
controls.maxPolarAngle = 3.14/4;

export default controls;
