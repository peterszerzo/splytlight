import React from "react";
import styled from "@emotion/styled";

import { Tree } from "../../splyt";
import Units from "./units";
import { useSimpleDrag } from "../hooks";

interface Props {
  tree: Tree;
  zoom?: number;
  size: {
    width: number;
    height: number;
  };
  changeTree?: (newTree: Tree) => void;
}

const Container = styled.div({
  margin: "auto",
  "& circle": {
    opacity: 0.1,
    cursor: "pointer"
  },
  "& circle:hover": {
    opacity: 0.6
  }
});

const Splyt2dEditor: React.SFC<Props> = props => {
  console.log(JSON.stringify(props.tree, null, 0));
  const { dragContainerAttrs, drag } = useSimpleDrag();
  return (
    <Container {...dragContainerAttrs}>
      <svg id="splyt-editor" viewBox={`0 0 ${props.size.width} ${props.size.height}`}>
        <g transform={`translate(${props.size.width / 2 + drag[0]} ${props.size.height * 0.1 + drag[1]}) scale(${props.zoom || 1})`}>
          <Units tree={props.tree} onTreeChange={props.changeTree} />
        </g>
      </svg>
    </Container>
  );
};

export default Splyt2dEditor;
