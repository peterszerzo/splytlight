import React from "react";
import styled from "@emotion/styled";

import getContainerDimensions from "../../styles/layout";
import { HandleChange, UiState } from "../../state";
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

export default ({ tree, ui, changeTree }: { tree: Tree, ui: UiState; changeTree: HandleChange<Tree> }) => {
  const { width, height } = getContainerDimensions(ui);
  return (
    <Container>
      <svg id="splyt-editor" viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${width / 2} ${height * 0.1})`}>
          <Units tree={tree} onTreeChange={changeTree} />
        </g>
      </svg>
    </Container>
  );
};
