import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";

import * as splyt from "../../splyt";
import * as styles from "../../styles";
import Popup from "./popup";
import Units, { UnitsContext } from "./units";
import { useSimpleDrag } from "../hooks";

interface Props {
  tree: splyt.Tree;
  zoom?: number;
  size: {
    width: number;
    height: number;
  };
  changeTree?: (newTree: splyt.Tree) => void;
  activePath: string | null;
  setActivePath: (newActivePath: string | null) => void;
}

const Container = styled.div({
  margin: "auto",
  width: "100%",
  height: "100%",
  position: "relative",
  "& .control-circle": {
    opacity: 0.2,
    fill: styles.gray,
    cursor: "pointer"
  },
  "& .control-circle--primary:hover": {
    opacity: 1,
    fill: styles.green
  },
  "& .control-circle--danger:hover": {
    opacity: 1,
    fill: styles.red
  }
});

const Splyt2dEditor: React.SFC<Props> = props => {
  const { tree, zoom, size, changeTree, activePath, setActivePath } = props;
  const { dragContainerAttrs, drag } = useSimpleDrag();
  const unitsContext: UnitsContext = {
    activePath,
    onActivate: setActivePath
  };
  const ref = useRef<null | HTMLDivElement>(null);

  const subtree =
    activePath !== null ? splyt.subtreeAt(activePath, tree) : null;

  useEffect(() => {
    const handleKeyDown = (ev: any) => {
      if (ev.key === "Escape") {
        setActivePath(null);
      } else if (
        ev.key === "ArrowUp" &&
        activePath !== null &&
        activePath.length > 0
      ) {
        setActivePath(activePath.slice(0, -1));
      } else if (ev.key === "ArrowDown") {
        if (activePath === null) {
          setActivePath("");
        } else {
          setActivePath(splyt.moveDown(activePath, tree));
        }
      } else if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
        if (activePath === null) {
          setActivePath("");
        } else {
          setActivePath(splyt.moveSide(activePath, tree));
        }
      } else if (
        ev.key === " " &&
        activePath !== null &&
        changeTree &&
        activePath.length > 0
      ) {
        changeTree(
          splyt.updateSubtreeAt(
            activePath,
            tree => ({
              ...tree,
              rotation: tree.rotation + (2 * Math.PI) / 16
            }),
            tree
          )
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePath, setActivePath, changeTree, tree]);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const handleContainerClick = (ev: any) => {
      if (ev.target.id === "splyt-editor") {
        setActivePath(null);
      }
    };
    node.addEventListener("click", handleContainerClick);
    return () => {
      if (!node) {
        return;
      }
      node.removeEventListener("click", handleContainerClick);
    };
  }, [ref, setActivePath]);
  return (
    <Container {...dragContainerAttrs} ref={ref}>
      <svg id="splyt-editor" viewBox={`0 0 ${size.width} ${size.height}`}>
        <g
          transform={`translate(${size.width / 2 + drag[0]} ${size.height *
            0.1 +
            drag[1]}) scale(${zoom || 1})`}
        >
          <Units
            path=""
            tree={tree}
            onTreeChange={changeTree}
            unitsContext={unitsContext}
          />
        </g>
      </svg>
      {activePath !== null && subtree !== null && (
        <Popup
          size={subtree.size}
          onSizeChange={newSize => {
            if (!changeTree) {
              return;
            }
            changeTree(
              splyt.updateSubtreeAt(
                activePath,
                tree => ({
                  ...tree,
                  size: newSize
                }),
                tree
              )
            );
          }}
          rotation={subtree.rotation}
          onRotationChange={
            activePath === ""
              ? undefined
              : newRotation => {
                  if (!changeTree) {
                    return;
                  }
                  changeTree(
                    splyt.updateSubtreeAt(
                      activePath,
                      tree => ({
                        ...tree,
                        rotation: newRotation
                      }),
                      tree
                    )
                  );
                }
          }
        />
      )}
    </Container>
  );
};

export default Splyt2dEditor;
