import React from "react"

import Unit from "./unit"
import * as splyt from "../../constants/geometries"
import { getEndPoints } from "../../splyt"

const { PI } = Math

export default function Units({ state, setState }) {
  if (!state) {
    return null
  }
  const { leftArm, rightArm } = splyt[state.size]
  const [{ x: xl, y: yl }, { x: xr, y: yr }] = getEndPoints(splyt[state.size])
  return <g opacity={["added", "removing"].indexOf(state.status) > -1 ? 1 : 0.5}>
    <g transform={`translate(${xl} ${yl}) rotate(${-leftArm.angle * 180 / PI})`}>
      <Units
        state={state.left}
        setState={ch => {
          setState({ left: { ...state.left, ...ch }})
        }}
      />
    </g>
    <g transform={`translate(${xr} ${yr}) rotate(${-rightArm.angle * 180 / PI})`}>
      <Units
        state={state.right}
        setState={(ch) => {
          setState({ right: { ...state.right, ...ch }})
        }}
      />
    </g>
    <Unit
      state={state}
      onEditControlClick={() => {
        setState({
          size: state.size === "small" ? "large" : "small"
        })
      }}
      onControlClick={(dir) => {
        setState({
          [dir]: {
            status:
              state[dir] &&
              ("added", "removing").indexOf(state[dir].status) > -1
                ? "adding"
                : "removing",
            rotation: 2 * Math.PI * Math.random(),
            size: "small"
          }
        })
      }}
      onControlMouseEnter={(dir) => {
        if (!state[dir]) {
          return setState({
            [dir]: {
              status: "adding",
              size: "small"
            }
          })
        }
        if (["adding", "removing"].indexOf(state[dir].status) === -1) {
          setState({
            [dir]: { ...state[dir], status: "removing" }
          })
        }
      }}
      onControlMouseLeave={(dir) => {
        if (!state[dir]) {
          return
        }
        if (state[dir].status === "adding") {
          return setState({
            [dir]: null
          })
        }
        if (state[dir].status === "removing") {
          setState({
            [dir]: { ...state[dir], status: "added" }
          })
        }
      }}
    />
  </g>
}
