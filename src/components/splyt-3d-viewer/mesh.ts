import * as three from "three";

import { part, Geometry as SplytGeometry, Dir, Tree } from "../../splyt";

const { sin, cos } = Math;

const transformSplyt = (
  object: three.Group,
  dimensions: SplytGeometry,
  dir: Dir,
  rotation: number
) => {
  const { baseHeight } = dimensions;
  const { angle, length } =
    dir === "left" ? dimensions.leftArm : dimensions.rightArm;
  object.rotateZ(angle);
  object.rotateY(rotation);
  object.position.set(
    -length * sin(angle),
    baseHeight + length * cos(angle),
    0
  );
};

const createSplytTree = (
  state: Tree | null,
  context: {
    currentPath?: string;
    activePath: string | null;
  }
): three.Group => {
  if (!state || state.status !== "added") {
    const emptyGroup = new three.Group();
    const sphereGeometry = new three.SphereGeometry(12, 16, 16);
    const sphereMaterial = new three.MeshLambertMaterial({ color: 0xefd439 });
    const sphereMesh = new three.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.translateY(13);
    emptyGroup.add(sphereMesh);
    return emptyGroup;
  } else {
    const leftGroup = createSplytTree(state.left, {
      ...context,
      currentPath: `${context.currentPath || ""}l`
    });
    const splytPart = part(state.size);
    transformSplyt(
      leftGroup,
      splytPart,
      "left",
      state.left ? state.left.rotation : 0
    );
    const rightGroup = createSplytTree(state.right, {
      ...context,
      currentPath: `${context.currentPath || ""}r`
    });
    transformSplyt(
      rightGroup,
      splytPart,
      "right",
      state.right ? state.right.rotation : 0
    );
    const group = new three.Group();
    group.add(leftGroup);
    group.add(rightGroup);
    group.add(
      createSplytUnit(splytPart, {
        isHighlighted:
          context.activePath !== null &&
          context.activePath === (context.currentPath || "")
      })
    );
    return group;
  }
};

const createCylinder = (length: number, radius: number) =>
  new three.CylinderGeometry(radius, radius, length, 24, 8, false);

const createArm = (
  {
    length,
    angle
  }: {
    length: number;
    angle: number;
  },
  baseHeight: number,
  radius: number
) => {
  const obj = createCylinder(length, radius);
  obj.rotateZ(angle);
  obj.translate(
    (-length * sin(angle)) / 2,
    baseHeight + (length * cos(angle)) / 2,
    0
  );
  return obj;
};

const offset = 1;

const material = new three.MeshLambertMaterial({
  color: 0x4a76b2
});

const highlightedMaterial = new three.MeshLambertMaterial({
  color: 0x365682
});

const createSplytUnit = (
  size: SplytGeometry,
  {
    isHighlighted
  }: {
    isHighlighted?: boolean;
  }
) => {
  const { baseHeight, radius, leftArm, rightArm } = size;

  const baseObj = createCylinder(baseHeight - offset, radius);
  baseObj.translate(0, baseHeight / 2 + offset, 0);

  const leftArmObj = createArm(leftArm, baseHeight, radius);
  const rightArmObj = createArm(rightArm, baseHeight, radius);

  const geometryAccumulator = new three.Geometry();
  [baseObj, leftArmObj, rightArmObj].forEach(object =>
    geometryAccumulator.merge(object)
  );

  return new three.Mesh(
    geometryAccumulator,
    isHighlighted ? highlightedMaterial : material
  );
};

export default createSplytTree;
