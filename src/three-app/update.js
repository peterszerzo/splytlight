import {Vector3, BoundingBoxHelper} from 'three';
import renderer from './renderer';
import render from './render';
import camera from './camera';
import scene from './scene';
import getVizContainerDimensions from '../utilities/layout';

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
  return group;
}

export default function update(state) {
  if (state.ui.windowWidth === 0 || state.ui.windowHeight === 0) {
    return;
  }
  const obj = addSplyt(state.tree);
  const helper = new BoundingBoxHelper(obj, 0xff0000);
  helper.update();
  resize(getVizContainerDimensions(state.ui), {
    x: Math.abs(helper.box.min.x - helper.box.max.x),
    y: Math.abs(helper.box.min.y - helper.box.max.y)
  });
  render();
}
