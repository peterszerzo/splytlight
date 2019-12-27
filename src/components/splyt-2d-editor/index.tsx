import React from "react";
import styled from "@emotion/styled";

import { HandleChange } from "../../state";
import { Tree } from "../../splyt";
import Units from "./units";

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

export default ({
  tree,
  size,
  changeTree
}: {
  tree: Tree;
  size: {
    width: number;
    height: number;
  };
  changeTree: HandleChange<Tree>;
}) => {
  return (
    <Container>
      <svg id="splyt-editor" viewBox={`0 0 ${size.width} ${size.height}`}>
        <g transform={`translate(${size.width / 2} ${size.height * 0.1})`}>
          <Units tree={tree} onTreeChange={changeTree} />
        </g>
      </svg>
    </Container>
  );
};
