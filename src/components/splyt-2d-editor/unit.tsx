import React, { useState } from "react";

import { part, getPoints, Tree, Status, Dir } from "../../splyt";
import * as styles from "../../styles";

interface Props {
  tree: Tree;
  isInactive?: boolean;
  onControlClick?: (dir: Dir) => void;
  onControlMouseEnter?: (dir: Dir) => void;
  onControlMouseLeave?: (dir: Dir) => void;
  onEditControlClick?: () => void;
}

const fillByControlStatus: Record<string, string> = {
  neutral: styles.brown,
  adding: styles.green,
  removing: styles.red,
  added: styles.brown
};

const Unit: React.SFC<Props> = props => {
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
      <Lines tree={props.tree} isInactive={props.isInactive} onClick={props.onEditControlClick} />
      {controls && <Controls state={props.tree} {...controls} />}
    </g>
  );
};

interface LinesProps {
  tree: Tree;
  onClick?: () => void;
  isInactive?: boolean;
}

const Lines: React.SFC<LinesProps> = props => {
  const {
    left: { x: xl, y: yl },
    right: { x: xr, y: yr },
    mid: { x: xm, y: ym },
    start: { x: x0, y: y0 }
  } = getPoints(part(props.tree.size), { useOffset: true });
  const [ hovered, setHovered ] = useState<boolean>(false);
  return (
    <g
      style={{
        cursor: "pointer",
        opacity: props.isInactive ? 0.6 : 1
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        props.onClick && props.onClick();
      }}
      stroke={hovered ? styles.lighterBlue : styles.blue}
      strokeWidth={styles.strokeWeight}
    >
      <g
        stroke={hovered ? styles.darkerBlue : styles.blue}
        strokeWidth={styles.strokeWeight}
      >
        <line x1={x0} y1={y0} x2={xm} y2={ym} />
        <line x1={xm} y1={ym} x2={xl} y2={yl} />
        <line x1={xm} y1={ym} x2={xr} y2={yr} />
      </g>
      <circle cx={xm} cy={ym} r="10" stroke="none" fill="rgba(255, 255, 255, 0.001)" />
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
          {false && <ControlCircle
        point={midPoint}
        status={"neutral"}
        onClick={onEditControlClick}
      />
              }
    </g>
  );
}

export default Unit;
