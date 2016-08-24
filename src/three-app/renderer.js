import {WebGLRenderer} from 'three';

const renderer = new WebGLRenderer({antialias: true});
renderer.setClearColor(0xffffff, 1);
renderer.shadowMap.enabled = true;

export default renderer;
