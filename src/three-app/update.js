import {Vector3} from 'three';
import renderer from './renderer';
import render from './render';
import camera from './camera';
import getVizContainerDimensions from '../utilities/layout';
import {read2DSize} from '../utilities/splyt';
import scene from './scene';

import create from './splyt';

function resize({width, height}, {x, y}) {
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.position.set(0, (x + y), (x + y));
  camera.lookAt(new Vector3(0, 0, 0));
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
  resize(getVizContainerDimensions(state.ui), read2DSize());
  render();
}
