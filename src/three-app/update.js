import renderer from './renderer';
import render from './render';
import camera from './camera';
import getVizContainerDimensions from '../utilities/layout';
import scene from './scene';

import create from './splyt';

function resize(containerWidth, containerHeight) {
  renderer.setSize(containerWidth, containerHeight);
  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();
}

let oldGroup;

function addSplyt(tree) {
  if (oldGroup) {
    scene.remove(oldGroup);
  }
  const group = create(tree);
  oldGroup = group;
  scene.add(group);
}

export default function update(state) {
  if (state.ui.windowWidth === 0 || state.ui.windowHeight === 0) {
    return;
  }
  addSplyt(state.tree);
  const {width, height} = getVizContainerDimensions(state.ui);
  resize(width, height);
  render();
}
