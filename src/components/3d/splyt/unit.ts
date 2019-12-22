import {
  CylinderGeometry,
  Geometry,
  SceneUtils,
  SmoothShading,
  MeshLambertMaterial
} from "three";

import { Geometry as SplytGeometry } from "../../../splyt";

const { sin, cos } = Math;

function createCylinder(length: number, radius: number) {
  return new CylinderGeometry(radius, radius, length, 24, 8, false);
}

function createArm({ length, angle }: any, baseHeight: number, radius: number) {
  const obj = createCylinder(length, radius);
  obj.rotateZ(angle);
  obj.translate(
    (-length * sin(angle)) / 2,
    baseHeight + (length * cos(angle)) / 2,
    0
  );
  return obj;
}

const o = 1;

export default function createSplytUnit(size: SplytGeometry) {
  const { baseHeight, radius, leftArm, rightArm } = size;

  const baseObj = createCylinder(baseHeight - o, radius);
  baseObj.translate(0, baseHeight / 2 + o, 0);

  const leftArmObj = createArm(leftArm, baseHeight, radius);
  const rightArmObj = createArm(rightArm, baseHeight, radius);

  const materials = [
    new MeshLambertMaterial({
      color: 0xfff9dc,
      shading: SmoothShading
    })
  ];

  const smallYGeo = new Geometry();
  [baseObj, leftArmObj, rightArmObj].forEach(o => smallYGeo.merge(o, o.matrix));

  const smallYMesh = SceneUtils.createMultiMaterialObject(smallYGeo, materials);

  return smallYMesh;
}
