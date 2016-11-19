import render from './render';
import renderer from './renderer';
import createControls from './controls';
import update from './update';
import {subscribe} from '../state';

export default function startThreeApp(state) {
  const container = document.getElementById('3d');
  container.appendChild(renderer.domElement);
  createControls(container).addEventListener('change', render);
  render();
  update(state);
  subscribe(update);
}
