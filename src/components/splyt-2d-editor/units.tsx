import React from "react";

import Unit from "./unit";
import { part, getEndPoints, Dir, Tree } from "../../splyt";

const { PI } = Math;

interface Props {
  tree: Tree | null;
  onTreeChange?: (newTree: Tree) => void;
  zoom?: number;
}

const Units: React.SFC<Props> = ({ tree, onTreeChange }) => {
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
              onTreeChange({ ...tree, left: { ...tree.left, ...change } });
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
              onTreeChange({ ...tree, right: { ...tree.right, ...change } });
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
              ...tree,
              size: tree.size === "small" ? "large" : "small"
            });
          })
        }
        onControlClick={
          onTreeChange &&
          ((dir: Dir) => {
            onTreeChange({
              ...tree,
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
                ...tree,
                [dir]: {
                  status: "adding",
                  size: "small"
                }
              });
            }
            if (["adding", "removing"].indexOf(tree[dir]!.status) === -1) {
              onTreeChange({
                ...tree,
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
                ...tree,
                [dir]: null
              });
            }
            if (tree[dir]!.status === "removing") {
              onTreeChange({
                ...tree,
                [dir]: { ...tree[dir], status: "added" }
              });
            }
          })
        }
      />
    </g>
  );
};

export default Units;
