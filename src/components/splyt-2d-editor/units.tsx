import React from "react";

import Unit from "./unit";
import { part, getEndPoints, Dir, Tree } from "../../splyt";

const { PI } = Math;

interface Props {
  path: string;
  tree: Tree | null;
  onTreeChange?: (newTree: Tree) => void;
  zoom?: number;
  unitsContext: UnitsContext;
}

export interface UnitsContext {
  activePath: string | null;
  onActivate: (path: string) => void;
}

const Units: React.SFC<Props> = props => {
  const { tree, onTreeChange } = props;
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
          path={`${props.path}l`}
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
          unitsContext={props.unitsContext}
        />
      </g>
      <g
        transform={`translate(${xr} ${yr}) rotate(${(-rightArm.angle * 180) /
          PI})`}
      >
        <Units
          path={`${props.path}r`}
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
          unitsContext={props.unitsContext}
        />
      </g>
      <Unit
        tree={tree}
        isInactive={
          props.unitsContext.activePath !== null &&
          props.unitsContext.activePath !== props.path
        }
        onEditControlClick={() => {
          props.unitsContext.onActivate(props.path);
        }}
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
