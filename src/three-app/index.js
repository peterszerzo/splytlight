import render from './render';
import renderer from './renderer';
import controls from './controls';
import update from './update';

import {subscribe} from '../state';

export default function startThreeApp(state) {
  const container = document.getElementById('3d');
  container.appendChild(renderer.domElement);
  update(state);
  render();
  controls.addEventListener('change', render);
  subscribe(update);
}
