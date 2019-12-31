import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import * as styles from "../../styles";
import * as splyt from "../../splyt";
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

const PopupContainer = styled.div({
  position: "absolute",
  bottom: 20,
  left: 20,
  width: 180,
  height: 120,
  backgroundColor: styles.white,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: 6
});

const Splyt2dEditor: React.SFC<Props> = props => {
  const { dragContainerAttrs, drag } = useSimpleDrag();
  const [activePath, setActivePath] = useState<null | string>(null);
  const unitsContext: UnitsContext = {
    onActivate: setActivePath
  };
  const ref = useRef<null | HTMLDivElement>(null);
  const handleContainerClick = (ev: any) => {
    if (ev.target.id === "splyt-editor") {
      setActivePath(null);
    }
  };
  const subtree =
    activePath !== null ? splyt.subtreeAt(activePath, props.tree) : null;
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.addEventListener("click", handleContainerClick);
    return () => {
      if (!ref.current) {
        return;
      }
      ref.current.removeEventListener("click", handleContainerClick);
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
      {activePath !== null && subtree !== null && props.changeTree && (
        <PopupContainer>
          <button
            onClick={() => {
              if (!props.changeTree) {
                return;
              }
              props.changeTree(
                splyt.updateSubtreeAt(
                  activePath,
                  tree => ({
                    ...tree,
                    size: tree.size === "small" ? "large" : "small"
                  }),
                  props.tree
                )
              );
            }}
          >
            Change
          </button>
        </PopupContainer>
      )}
    </Container>
  );
};

export default Splyt2dEditor;
