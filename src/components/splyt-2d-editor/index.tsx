import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import * as splyt from "../../splyt";
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
}

const Container = styled.div({
  margin: "auto",
  position: "relative",
  "& circle": {
    opacity: 0.1,
    cursor: "pointer"
  },
  "& circle:hover": {
    opacity: 0.6
  }
});

const Splyt2dEditor: React.SFC<Props> = props => {
  const { dragContainerAttrs, drag } = useSimpleDrag();
  const [activePath, setActivePath] = useState<null | string>(null);
  const unitsContext: UnitsContext = {
    activePath,
    onActivate: setActivePath
  };
  const ref = useRef<null | HTMLDivElement>(null);

  const subtree =
    activePath !== null ? splyt.subtreeAt(activePath, props.tree) : null;

  useEffect(() => {
    const handleKeyDown = (ev: any) => {
      if (
        ev.key === "ArrowUp" &&
        activePath !== null &&
        activePath.length > 0
      ) {
        setActivePath(activePath.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePath]);

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
  }, [ref]);
  return (
    <Container {...dragContainerAttrs} ref={ref}>
      <svg
        id="splyt-editor"
        viewBox={`0 0 ${props.size.width} ${props.size.height}`}
      >
        <g
          transform={`translate(${props.size.width / 2 + drag[0]} ${props.size
            .height *
            0.1 +
            drag[1]}) scale(${props.zoom || 1})`}
        >
          <Units
            path=""
            tree={props.tree}
            onTreeChange={props.changeTree}
            unitsContext={unitsContext}
          />
        </g>
      </svg>
      {activePath !== null && subtree !== null && (
        <Popup
          size={subtree.size}
          onSizeChange={newSize => {
            if (!props.changeTree) {
              return;
            }
            props.changeTree(
              splyt.updateSubtreeAt(
                activePath,
                tree => ({
                  ...tree,
                  size: newSize
                }),
                props.tree
              )
            );
          }}
          rotation={subtree.rotation}
          onRotationChange={
            activePath === ""
              ? undefined
              : newRotation => {
                  if (!props.changeTree) {
                    return;
                  }
                  props.changeTree(
                    splyt.updateSubtreeAt(
                      activePath,
                      tree => ({
                        ...tree,
                        rotation: newRotation
                      }),
                      props.tree
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
