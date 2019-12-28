import React from "react";
import styled from "@emotion/styled";

import { Tree } from "../../splyt";
import Units from "./units";

interface Props {
  tree: Tree;
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

export default ({ tree, size, changeTree }: Props) => {
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
