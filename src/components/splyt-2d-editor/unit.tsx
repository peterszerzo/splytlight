import React from "react";

import { part, getPoints, Tree, Status, Dir } from "../../splyt";
import * as styles from "../../styles";

const fillByControlStatus: Record<string, string> = {
  neutral: styles.brown,
  adding: styles.green,
  removing: styles.red,
  added: styles.brown
};

export default (props: {
  state: Tree;
  onControlClick?: (dir: Dir) => void;
  onControlMouseEnter?: (dir: Dir) => void;
  onControlMouseLeave?: (dir: Dir) => void;
  onEditControlClick?: () => void;
}) => {
  const controls =
    props.onControlClick &&
    props.onControlMouseEnter &&
    props.onControlMouseLeave &&
    props.onEditControlClick
      ? {
          onControlClick: props.onControlClick,
          onControlMouseEnter: props.onControlMouseEnter,
          onControlMouseLeave: props.onControlMouseLeave,
          onEditControlClick: props.onEditControlClick
        }
      : undefined;
  return (
    <g>
      <Lines {...props.state} />
      {controls && <Controls state={props.state} {...controls} />}
    </g>
  );
};

const Lines = (state: Tree) => {
  const {
    left: { x: xl, y: yl },
    right: { x: xr, y: yr },
    mid: { x: xm, y: ym },
    start: { x: x0, y: y0 }
  } = getPoints(part(state.size), { useOffset: true });
  return (
    <g
      stroke={styles.blue}
      strokeWidth={styles.strokeWeight}
    >
      <line x1={x0} y1={y0} x2={xm} y2={ym} />
      <line x1={xm} y1={ym} x2={xl} y2={yl} />
      <line x1={xm} y1={ym} x2={xr} y2={yr} />
    </g>
  );
};

function ControlCircle({
  point,
  status,
  onClick,
  onMouseOver,
  onMouseOut
}: {
  status: Status | "neutral";
  point: { x: number; y: number };
  onClick: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}) {
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
      <circle cx={0} cy={0} r={styles.controlCircleRadius} />
    </g>
  );
}

function Controls({
  state,
  onControlClick,
  onControlMouseEnter,
  onControlMouseLeave,
  onEditControlClick
}: {
  state: Tree;
  onControlClick: (dir: Dir) => void;
  onControlMouseEnter: (dir: Dir) => void;
  onControlMouseLeave: (dir: Dir) => void;
  onEditControlClick: () => void;
}) {
  const { left: leftPoint, right: rightPoint, mid: midPoint } = getPoints(
    part(state.size),
    { useOffset: false }
  );
  return (
    <g stroke="none">
      <ControlCircle
        point={leftPoint}
        status={state.left ? state.left.status : "neutral"}
        onClick={() => {
          onControlClick("left");
        }}
        onMouseOver={() => {
          onControlMouseEnter("left");
        }}
        onMouseOut={() => {
          onControlMouseLeave("left");
        }}
      />
      <ControlCircle
        point={rightPoint}
        status={state.right ? state.right.status : "neutral"}
        onClick={() => {
          onControlClick("right");
        }}
        onMouseOver={() => {
          onControlMouseEnter("right");
        }}
        onMouseOut={() => {
          onControlMouseLeave("right");
        }}
      />
      <ControlCircle
        point={midPoint}
        status={"neutral"}
        onClick={onEditControlClick}
      />
    </g>
  );
}
