import * as styles from "./styles";
import * as t from "io-ts";

// Status

export const StatusCodec = t.union([
  t.literal("added"),
  t.literal("adding"),
  t.literal("removing")
]);

export type Status = t.TypeOf<typeof StatusCodec>;

// Dir

export const DirCodec = t.union([t.literal("left"), t.literal("right")]);

export type Dir = t.TypeOf<typeof DirCodec>;

// Size

export const SizeCodec = t.union([t.literal("small"), t.literal("large")]);

export type Size = t.TypeOf<typeof SizeCodec>;

// Tree

export interface Tree {
  size: Size;
  status: Status;
  rotation: number;
  left: Tree | null;
  right: Tree | null;
}

export const TreeCodec: t.Type<Tree> = t.recursion("Tree", () =>
  t.type({
    size: SizeCodec,
    status: StatusCodec,
    rotation: t.number,
    left: t.union([TreeCodec, t.null]),
    right: t.union([TreeCodec, t.null])
  })
);

// Splyt

export const SplytCodec = t.type({
  treeId: t.string,
  name: t.string,
  isPublic: t.boolean,
  tree: TreeCodec,
  createdAt: t.union([t.undefined, t.string])
});

export type Splyt = t.TypeOf<typeof SplytCodec>;

// Tree utilities

export const subtreeAt = (path: string, tree: Tree): Tree | null => {
  if (path.length === 0) {
    return tree;
  }
  const firstPath = path[0];
  const restPath = path.slice(1);
  if (firstPath === "l" && tree.left !== null) {
    return subtreeAt(restPath, tree.left);
  }
  if (firstPath === "r" && tree.right !== null) {
    return subtreeAt(restPath, tree.right);
  }
  return null;
};

export const moveDown = (path: string, tree: Tree): string => {
  if (path === "") {
    return tree.left ? "l" : tree.right ? "r" : "";
  }
  const firstPath = path[0];
  const restPath = path.slice(1);
  if ((firstPath === "r" && !tree.right) || (firstPath === "l" && !tree.left)) {
    return firstPath;
  }
  return `${firstPath}${moveDown(
    restPath,
    (firstPath === "r" ? tree.right : tree.left) as Tree
  )}`;
};

export const moveSide = (path: string, tree: Tree): string => {
  if (path === "") {
    return "";
  }
  const firstPath = path[0];
  const restPath = path.slice(1);
  if (restPath.length === 0) {
    if (firstPath === "l" && tree.right) {
      return "r";
    } else if (firstPath === "r" && tree.left) {
      return "l";
    } else {
      return firstPath;
    }
  }
  if ((firstPath === "r" && !tree.right) || (firstPath === "l" && !tree.left)) {
    return firstPath;
  }
  return `${firstPath}${moveSide(
    restPath,
    (firstPath === "r" ? tree.right : tree.left) as Tree
  )}`;
};

export const updateSubtreeAt = (
  path: string,
  fn: (tree: Tree) => Tree,
  tree: Tree
): Tree => {
  if (path.length === 0) {
    return fn(tree);
  }
  const firstPath = path[0];
  const restPath = path.slice(1);
  if (firstPath === "l" && tree.left !== null) {
    return {
      ...tree,
      left: updateSubtreeAt(restPath, fn, tree.left)
    };
  }
  if (firstPath === "r" && tree.right !== null) {
    return {
      ...tree,
      right: updateSubtreeAt(restPath, fn, tree.right)
    };
  }
  return tree;
};

export const initialTree: Tree = {
  size: "small",
  status: "added",
  rotation: 0,
  left: null,
  right: null
};

export const isTreeDraft = (tree: Tree | null): boolean => {
  if (!tree) {
    return false;
  }
  if (tree.status !== "added") {
    return true;
  }
  return isTreeDraft(tree.left) || isTreeDraft(tree.right);
};

export interface Geometry {
  baseHeight: number;
  radius: number;
  leftArm: {
    length: number;
    angle: number;
  };
  rightArm: {
    length: number;
    angle: number;
  };
}

export const small: Geometry = {
  baseHeight: 30,
  radius: 9.25,
  leftArm: {
    length: 30,
    angle: Math.PI / 6
  },
  rightArm: {
    length: 40,
    angle: -Math.PI / 6
  }
};

export const large: Geometry = {
  baseHeight: 70,
  radius: 9.25,
  leftArm: {
    length: 80,
    angle: Math.PI / 6
  },
  rightArm: {
    length: 80,
    angle: -Math.PI / 6
  }
};

export const part = (size: Size): Geometry => {
  if (size === "small") {
    return small;
  }
  return large;
};

export type GeometryOptions = {
  useOffset: boolean;
};

export const getPoints = (
  { baseHeight, leftArm, rightArm }: Geometry,
  options?: GeometryOptions
) => {
  const offset = options && options.useOffset ? styles.controlCircleOffset : 0;
  return {
    left: {
      x: (leftArm.length - offset / 2) * Math.sin(leftArm.angle),
      y: baseHeight + (leftArm.length - offset / 2) * Math.cos(leftArm.angle)
    },
    right: {
      x: (rightArm.length - offset / 2) * Math.sin(rightArm.angle),
      y: baseHeight + (rightArm.length - offset / 2) * Math.cos(rightArm.angle)
    },
    mid: {
      x: 0,
      y: baseHeight
    },
    start: {
      x: 0,
      y: offset / 2
    }
  };
};

export const getEndPoints = (
  { baseHeight, leftArm, rightArm }: Geometry,
  options?: GeometryOptions
) => {
  const offset = options && options.useOffset ? styles.controlCircleOffset : 0;
  return [
    {
      x: (leftArm.length - offset / 2) * Math.sin(leftArm.angle),
      y: baseHeight + (leftArm.length - offset / 2) * Math.cos(leftArm.angle)
    },
    {
      x: (rightArm.length - offset / 2) * Math.sin(rightArm.angle),
      y: baseHeight + (rightArm.length - offset / 2) * Math.cos(rightArm.angle)
    }
  ];
};

export const getStartPoint = (
  { baseHeight }: Geometry,
  options?: GeometryOptions
) => {
  const offset = options && options.useOffset ? styles.controlCircleOffset : 0;
  return {
    x: 0,
    y: offset / 2
  };
};

export const getMidPoint = ({ baseHeight }: Geometry) => {
  return {
    x: 0,
    y: baseHeight
  };
};
