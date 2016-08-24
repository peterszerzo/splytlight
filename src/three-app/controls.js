import THREE from 'three';

import camera from './camera';

const OrbitControls = require('three-orbit-controls')(THREE);

const controls = new OrbitControls(camera);

export default controls;
