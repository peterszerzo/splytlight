import renderer from './renderer';
import render from './render';
import camera from './camera';
import getVizContainerDimensions from '../utilities/layout';

export function resize(containerWidth, containerHeight) {
  renderer.setSize(containerWidth, containerHeight);
  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();
}

export default function update(state) {
  if (state.ui.windowWidth === 0 || state.ui.windowHeight === 0) {
    return;
  }
  const {width, height} = getVizContainerDimensions(state.ui);
  resize(width, height);
  render();
}
