import React from "react";
import styled from "@emotion/styled";

import Splyt3dViewer from "./splyt-3d-viewer";
import { Tree } from "../splyt";

const Container = styled.div({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20
});

const Content = styled.div({});

const MobileScreen: React.SFC<{}> = () => (
  <Container>
    <Content>
      <Splyt3dViewer tree={exampleTree} size={{ width: 200, height: 260 }} />
      <p>
        Thanks for stopping by! This is the Splyt Light drawing app, supporting
        desktop only. Swing by again from a laptop, perhaps?
      </p>
    </Content>
  </Container>
);

const exampleTree: Tree = {
  right: {
    right: null,
    size: "small",
    left: {
      right: {
        right: null,
        size: "small",
        status: "added",
        rotation: 6.270544549486419
      },
      size: "small",
      left: null,
      status: "added",
      rotation: 3.2576195859336847
    },
    status: "added",
    rotation: 0.10723659253574716
  },
  size: "small",
  left: {
    right: {
      right: {
        size: "small",
        left: { size: "small", status: "added", rotation: 0.6299748878704586 },
        status: "added",
        rotation: 1.8021037320477717
      },
      size: "small",
      left: {
        size: "small",
        left: {
          size: "small",
          left: null,
          status: "added",
          rotation: 0.12906075617729645
        },
        status: "added",
        rotation: 3.0852534860078937
      },
      status: "added",
      rotation: 0.19577616863926375
    },
    size: "small",
    left: {
      right: {
        right: null,
        size: "small",
        left: null,
        status: "added",
        rotation: 6.034406975746223
      },
      size: "small",
      left: null,
      status: "added",
      rotation: 5.217948035646536
    },
    status: "added",
    rotation: 3.7327789569447787
  },
  status: "added",
  rotation: 0
} as Tree;

export default MobileScreen;
