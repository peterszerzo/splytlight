import {
  CylinderGeometry,
  Geometry,
  SceneUtils,
  SmoothShading,
  MeshLambertMaterial
} from 'three';

export default function createSplytUnit(size) {
  const r = size.radius;
  const bHeight = size.baseHeight;
  const armLength = size.armLength;
  const armAngle = size.armAngle;
  const radSegments = 24;
  const heightSegments = 8;

  const base = new CylinderGeometry(r, r, bHeight, radSegments, heightSegments, false);
  base.translate(0, bHeight/2, 0);

  const rArm = new CylinderGeometry(r, r, armLength, radSegments, heightSegments, false);
  rArm.rotateZ(- (Math.PI / 2 - armAngle));
  rArm.translate( 0.25 * armLength, bHeight + 0.25 * armLength * Math.sqrt(3), 0);

  const lArm = new CylinderGeometry(r, r, armLength, radSegments, heightSegments, false);
  lArm.rotateZ(Math.PI / 2 - armAngle);
  lArm.translate( -0.25 * armLength, bHeight + 0.25 * armLength * Math.sqrt(3), 0);

  const materials = [
    new MeshLambertMaterial({color:  0xFFF9DC, shading: SmoothShading})
  ];

  const smallYGeo = new Geometry();
  smallYGeo.merge(base, base.matrix);
  smallYGeo.merge(rArm, rArm.matrix);
  smallYGeo.merge(lArm, lArm.matrix);
  smallYGeo.rotateY(0 * Math.PI / 180);

  const smallYMesh = new SceneUtils.createMultiMaterialObject(smallYGeo, materials);
  smallYMesh.name = name;

  return smallYMesh;
}
