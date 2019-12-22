import React from "react";

import { part, getPoints } from "../../splyt";
import {
  brown,
  green,
  red,
  blue,
  strokeWeight,
  controlCircleRadius
} from "../../styles/vars";

const fillByControlStatus: Record<string, string> = {
  neutral: brown,
  adding: green,
  removing: red,
  added: brown
};

export default (props: any) => {
  return (
    <g>
      <Lines {...props.state} />
      <Controls {...props} />
    </g>
  );
};

const Lines = (state: any) => {
  const {
    left: { x: xl, y: yl },
    right: { x: xr, y: yr },
    mid: { x: xm, y: ym },
    start: { x: x0, y: y0 }
  } = getPoints(part(state.size), { useOffset: true });
  return (
    <g
      stroke={blue}
      strokeWidth={strokeWeight}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    >
      <line x1={x0} y1={y0} x2={xm} y2={ym} />
      <line x1={xm} y1={ym} x2={xl} y2={yl} />
      <line x1={xm} y1={ym} x2={xr} y2={yr} />
    </g>
  );
}

function ControlCircle({ point, status, onClick, onMouseOver, onMouseOut }: any) {
  return (
    <g
      transform={`translate(${point.x} ${point.y})`}
      fill={fillByControlStatus[status]}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <circle cx={0} cy={0} r={controlCircleRadius} />
    </g>
  );
}

function Controls({
  state,
  onControlClick,
  onControlMouseEnter,
  onControlMouseLeave,
  onEditControlClick
}: any) {
  const { left: leftPoint, right: rightPoint, mid: midPoint } = getPoints(
    part(state.size),
    { useOffset: false }
  );
  return (
    <g stroke="none">
      <ControlCircle
        point={leftPoint}
        status={state.left ? state.left.status : "neutral"}
        onClick={onControlClick.bind({}, "left")}
        onMouseOver={onControlMouseEnter.bind({}, "left")}
        onMouseOut={onControlMouseLeave.bind({}, "left")}
      />
      <ControlCircle
        point={rightPoint}
        status={state.right ? state.right.status : "neutral"}
        onClick={onControlClick.bind({}, "right")}
        onMouseOver={onControlMouseEnter.bind({}, "right")}
        onMouseOut={onControlMouseLeave.bind({}, "right")}
      />
      <ControlCircle
        point={midPoint}
        status={"neutral"}
        onClick={onEditControlClick}
      />
    </g>
  );
}
