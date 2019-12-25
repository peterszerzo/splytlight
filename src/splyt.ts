import { controlCircleOffset } from "./styles/vars";

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

export type Size = "small" | "large";

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
  const offset = options && options.useOffset ? controlCircleOffset : 0;
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
  const offset = options && options.useOffset ? controlCircleOffset : 0;
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
  const offset = options && options.useOffset ? controlCircleOffset : 0;
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
