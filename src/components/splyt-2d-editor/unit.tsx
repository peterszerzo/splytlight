import React, { useState } from "react";

import { part, getPoints, Tree, Dir } from "../../splyt";
import * as styles from "../../styles";

type Theme = "primary" | "danger";

interface Props {
  tree: Tree;
  isInactive?: boolean;
  onControlClick?: (dir: Dir) => void;
  controlTheme: (dir: Dir) => Theme;
  onActivate?: () => void;
}

const Unit: React.SFC<Props> = props => {
  const showControls = props.onControlClick || props.onActivate;
  return (
    <g>
      <Lines
        tree={props.tree}
        isInactive={props.isInactive}
        onClick={props.onActivate}
      />
      {showControls && (
        <Controls
          controlTheme={props.controlTheme}
          state={props.tree}
          {...{
            onControlClick: props.onControlClick
          }}
        />
      )}
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
  const [hovered, setHovered] = useState<boolean>(false);
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
      <circle
        cx={xm}
        cy={ym}
        r="10"
        stroke="none"
        fill="rgba(255, 255, 255, 0.001)"
      />
    </g>
  );
};

const ControlCircle = ({
  point,
  theme,
  onClick,
  onMouseOver,
  onMouseOut
}: {
  theme: "primary" | "danger";
  point: { x: number; y: number };
  onClick: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}) => {
  return (
    <g
      transform={`translate(${point.x} ${point.y})`}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <circle
        className={`control-circle control-circle--${theme}`}
        cx={0}
        cy={0}
        r={styles.controlCircleRadius}
      />
    </g>
  );
};

const Controls = ({
  state,
  controlTheme,
  onControlClick
}: {
  state: Tree;
  controlTheme: (dir: Dir) => Theme;
  onControlClick?: (dir: Dir) => void;
}) => {
  const { left: leftPoint, right: rightPoint } = getPoints(part(state.size), {
    useOffset: false
  });
  return (
    <g stroke="none">
      <ControlCircle
        point={leftPoint}
        theme={controlTheme("left")}
        onClick={() => {
          onControlClick && onControlClick("left");
        }}
      />
      <ControlCircle
        point={rightPoint}
        theme={controlTheme("right")}
        onClick={() => {
          onControlClick && onControlClick("right");
        }}
      />
    </g>
  );
};

export default Unit;
