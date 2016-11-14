import {
  AxisHelper,
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  CircleGeometry
} from 'three';

export const axisHelper = new AxisHelper(50);

const planeGeometry = new CircleGeometry(50, 40);
const planeMaterial = new MeshLambertMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 1,
  side: DoubleSide
});

export const plane = new Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x= - Math.PI / 2;
plane.position.set(0, 0, 0);
