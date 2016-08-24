import scene from './scene';
import camera from './camera';
import renderer from './renderer';

export default function render() {
  renderer.render(scene, camera);
}
