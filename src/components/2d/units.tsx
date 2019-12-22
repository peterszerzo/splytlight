import React from "react";

import Unit from "./unit";
import { part, getEndPoints } from "../../splyt";
import { Dir, Tree, SetTree } from "../../state";

const { PI } = Math;

export default function Units({
  state,
  setState
}: {
  state: Tree | null;
  setState: SetTree;
}) {
  if (!state) {
    return null;
  }
  const splytPart = part(state.size);
  const { leftArm, rightArm } = splytPart;
  const [{ x: xl, y: yl }, { x: xr, y: yr }] = getEndPoints(splytPart);
  return (
    <g opacity={["added", "removing"].indexOf(state.status) > -1 ? 1 : 0.5}>
      <g
        transform={`translate(${xl} ${yl}) rotate(${(-leftArm.angle * 180) /
          PI})`}
      >
        <Units
          state={state.left}
          setState={(change: Partial<Tree>) => {
            if (!state.left) {
              return;
            }
            setState({ left: { ...state.left, ...change } });
          }}
        />
      </g>
      <g
        transform={`translate(${xr} ${yr}) rotate(${(-rightArm.angle * 180) /
          PI})`}
      >
        <Units
          state={state.right}
          setState={(change: Partial<Tree>) => {
            if (!state.right) {
              return;
            }
            setState({ right: { ...state.right, ...change } });
          }}
        />
      </g>
      <Unit
        state={state}
        onEditControlClick={() => {
          setState({
            size: state.size === "small" ? "large" : "small"
          });
        }}
        onControlClick={(dir: Dir) => {
          setState({
            [dir]: {
              status:
                state[dir] &&
                ["added", "removing"].indexOf(state[dir]!.status) > -1
                  ? "adding"
                  : "removing",
              rotation: 2 * Math.PI * Math.random(),
              size: "small"
            }
          });
        }}
        onControlMouseEnter={(dir: Dir) => {
          if (!state[dir]) {
            return setState({
              [dir]: {
                status: "adding",
                size: "small"
              }
            });
          }
          if (["adding", "removing"].indexOf(state[dir]!.status) === -1) {
            setState({
              [dir]: { ...state[dir], status: "removing" }
            });
          }
        }}
        onControlMouseLeave={(dir: Dir) => {
          if (!state[dir]) {
            return;
          }
          if (state[dir]!.status === "adding") {
            return setState({
              [dir]: null
            });
          }
          if (state[dir]!.status === "removing") {
            setState({
              [dir]: { ...state[dir], status: "added" }
            });
          }
        }}
      />
    </g>
  );
}
