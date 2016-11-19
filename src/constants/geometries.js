// @flow

type Arm = {
  length : number,
  angle : number
};

type Geometry = {
  baseHeight : number,
  radius : number,
  leftArm : Arm
};

const small : Geometry = {
  baseHeight: 30,
  radius: 9.25,
  leftArm: {
    length: 30,
    angle: Math.PI / 6
  },
  rightArm: {
    length: 40,
    angle: - Math.PI / 6
  }
};

const large : Geometry = {
  baseHeight: 70,
  radius: 9.25,
  leftArm: {
    length: 80,
    angle: Math.PI / 6
  },
  rightArm: {
    length: 80,
    angle: - Math.PI / 6
  }
};

export const splyt = {
  small,
  large
};
