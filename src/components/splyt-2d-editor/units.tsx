import React from "react";

import Unit from "./unit";
import { part, getEndPoints, Dir, Tree } from "../../splyt";
import { HandleChange } from "../../state";

const { PI } = Math;

export default function Units({
  tree,
  onTreeChange
}: {
  tree: Tree | null;
  onTreeChange?: HandleChange<Tree>;
}) {
  if (!tree) {
    return null;
  }
  const splytPart = part(tree.size);
  const { leftArm, rightArm } = splytPart;
  const [{ x: xl, y: yl }, { x: xr, y: yr }] = getEndPoints(splytPart);
  return (
    <g opacity={["added", "removing"].indexOf(tree.status) > -1 ? 1 : 0.5}>
      <g
        transform={`translate(${xl} ${yl}) rotate(${(-leftArm.angle * 180) /
          PI})`}
      >
        <Units
          tree={tree.left}
          onTreeChange={
            onTreeChange &&
            ((change: Partial<Tree>) => {
              if (!tree.left) {
                return;
              }
              onTreeChange({ left: { ...tree.left, ...change } });
            })
          }
        />
      </g>
      <g
        transform={`translate(${xr} ${yr}) rotate(${(-rightArm.angle * 180) /
          PI})`}
      >
        <Units
          tree={tree.right}
          onTreeChange={
            onTreeChange &&
            ((change: Partial<Tree>) => {
              if (!tree.right) {
                return;
              }
              onTreeChange({ right: { ...tree.right, ...change } });
            })
          }
        />
      </g>
      <Unit
        state={tree}
        onEditControlClick={
          onTreeChange &&
          (() => {
            onTreeChange({
              size: tree.size === "small" ? "large" : "small"
            });
          })
        }
        onControlClick={
          onTreeChange &&
          ((dir: Dir) => {
            onTreeChange({
              [dir]: {
                status:
                  tree[dir] &&
                  ["added", "removing"].indexOf(tree[dir]!.status) > -1
                    ? "adding"
                    : "removing",
                rotation: 2 * Math.PI * Math.random(),
                size: "small"
              }
            });
          })
        }
        onControlMouseEnter={
          onTreeChange &&
          ((dir: Dir) => {
            if (!tree[dir]) {
              return onTreeChange({
                [dir]: {
                  status: "adding",
                  size: "small"
                }
              });
            }
            if (["adding", "removing"].indexOf(tree[dir]!.status) === -1) {
              onTreeChange({
                [dir]: { ...tree[dir], status: "removing" }
              });
            }
          })
        }
        onControlMouseLeave={
          onTreeChange &&
          ((dir: Dir) => {
            if (!tree[dir]) {
              return;
            }
            if (tree[dir]!.status === "adding") {
              return onTreeChange({
                [dir]: null
              });
            }
            if (tree[dir]!.status === "removing") {
              onTreeChange({
                [dir]: { ...tree[dir], status: "added" }
              });
            }
          })
        }
      />
    </g>
  );
}
