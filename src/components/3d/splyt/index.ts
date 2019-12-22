import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from "three";

import { part } from "../../../splyt";
import createSplytUnit from "./unit";

const { sin, cos } = Math;

function transformSplyt(
  object: any,
  dimensions: any,
  direction: any,
  rotation: any
) {
  const { baseHeight } = dimensions;
  const { angle, length } = dimensions[direction + "Arm"];
  object.rotateZ(angle);
  object.rotateY(rotation);
  object.position.set(
    -length * sin(angle),
    baseHeight + length * cos(angle),
    0
  );
}

export default function createSplytTree(state: any) {
  if (!state || state.status === "adding") {
    const emptyGroup = new Group();
    const sphereGeometry = new SphereGeometry(12, 16, 16);
    const sphereMaterial = new MeshBasicMaterial({ color: 0xffc235 });
    const sphereMesh = new Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.translateY(13);
    emptyGroup.add(sphereMesh);
    return emptyGroup;
  } else {
    const leftGroup = createSplytTree(state.left);
    const splytPart = part(state.size);
    transformSplyt(leftGroup, splytPart, "left", state.rotation);
    const rightGroup = createSplytTree(state.right);
    transformSplyt(rightGroup, splytPart, "right", state.rotation);
    const group = new Group();
    group.add(leftGroup);
    group.add(rightGroup);
    group.add(createSplytUnit(splytPart));
    return group;
  }
}
