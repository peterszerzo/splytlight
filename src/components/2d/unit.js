import React from "react"
import * as splyt from "../../constants/geometries"
import { getPoints } from "../../splyt.js"
import {
  brown,
  green,
  red,
  blue,
  strokeWeight,
  controlCircleRadius
} from "../../styles/vars"

const fillByControlStatus = {
  neutral: brown,
  adding: green,
  removing: red,
  added: brown
}

export default props => {
  return (
    <g>
      <Lines {...props.state} />
      <Controls {...props} />
    </g>
  )
}

function Lines(state) {
  const {
    left: { x: xl, y: yl },
    right: { x: xr, y: yr },
    mid: { x: xm, y: ym },
    start: { x: x0, y: y0 }
  } = getPoints(splyt[state.size], { useOffset: true })
  return (
    <g
      stroke={blue}
      strokeWidth={strokeWeight}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    >
      <line x1={x0} y1={y0} x2={xm} y2={ym} />,
      <line x1={xm} y1={ym} x2={xl} y2={yl} />,
      <line x1={xm} y1={ym} x2={xr} y2={yr} />
    </g>
  )
}

function ControlCircle({ point, status, onClick, onMouseOver, onMouseOut }) {
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
  )
}

function Controls({
  state,
  onControlClick,
  onControlMouseEnter,
  onControlMouseLeave,
  onEditControlClick
}) {
  const { left: leftPoint, right: rightPoint, mid: midPoint } = getPoints(
    splyt[state.size],
    { useOffset: false }
  )
  return (
    <g stroke="none">
      <ControlCircle
        point={leftPoint}
        status={state.left ? state.left.status : "neutral"}
        onClick={onControlClick.bind(this, "left")}
        onMouseOver={onControlMouseEnter.bind(this, "left")}
        onMouseOut={onControlMouseLeave.bind(this, "left")}
      />,
      <ControlCircle
        point={rightPoint}
        status={state.right ? state.right.status : "neutral"}
        onClick={onControlClick.bind(this, "right")}
        onMouseOver={onControlMouseEnter.bind(this, "right")}
        onMouseOut={onControlMouseLeave.bind(this, "right")}
      />,
      <ControlCircle
        point={midPoint}
        status={"neutral"}
        onClick={onEditControlClick}
      />
    </g>
  )
}
