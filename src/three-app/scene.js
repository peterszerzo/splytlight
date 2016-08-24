import {Scene} from 'three';

import {axisHelper, plane} from './environment';
import lights from './lights';

const scene = new Scene();

scene.add(axisHelper);
scene.add(plane);

lights.forEach((light) => {
  scene.add(light);
});

export default scene;
