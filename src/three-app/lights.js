import {AmbientLight, DirectionalLight} from 'three';

const light1 = new DirectionalLight(0xffffff);
light1.position.set(10, 10, 10);

const light2 = new DirectionalLight(0xffffff);
light2.position.set(-10, -10, -10);

const light3 = new AmbientLight(0x222222);

export default [light1, light2, light3];
