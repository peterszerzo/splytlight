import renderer from './renderer';
import camera from './camera';

export function resize(containerWidth, containerHeight) {
  const container = document.getElementById('3d');
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
}

export default function update({ui: {windowWidth, windowHeight}}) {
  resize(windowWidth / 2, windowHeight - 80);
}
