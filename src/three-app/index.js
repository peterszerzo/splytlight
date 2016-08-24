import render from './render';
import renderer from './renderer';
import controls from './controls';
import {onResize} from './update';

export default function start() {
  const container = document.getElementById('3d');
  container.appendChild(renderer.domElement);
  onResize();
  render();
  controls.addEventListener('change', render);
  window.addEventListener('resize', onResize);
}
