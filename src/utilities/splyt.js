export function getEndPoints({baseHeight, armLength, armAngle}, options) {
  const offset = (options && options.useOffset) ? baseHeight * .4 : 0;
  return [
    {
      x: - (armLength - offset / 2) * Math.cos(armAngle),
      y: baseHeight + (armLength - offset / 2) * Math.sin(armAngle)
    },
    {
      x: + (armLength - offset / 2) * Math.cos(armAngle),
      y: baseHeight + (armLength - offset / 2) * Math.sin(armAngle)
    }
  ];
}

export function getStartPoint({baseHeight, armLength, armAngle}, options) {
  const offset = (options && options.useOffset) ? baseHeight * .4 : 0;
  return {
    x: 0,
    y: offset / 2
  };
}

export function getMidPoint({baseHeight, armLength, armAngle}) {
  return {
    x: 0,
    y: baseHeight
  };
}
