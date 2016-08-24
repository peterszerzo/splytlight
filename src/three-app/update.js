import renderer from './renderer';
import camera from './camera';

export function onResize() {
  const container = document.getElementById('3d');
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
}
