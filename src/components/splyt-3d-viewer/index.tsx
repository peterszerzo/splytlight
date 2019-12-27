import React, { useEffect, useState, useRef } from "react";
import { useDrag } from "react-use-gesture";

import createThreeApp, { ThreeApp } from "./three-app";
import { Tree } from "../../splyt";

type Pt = [number, number];

const addPts = ([x1, y1]: Pt, [x2, y2]: Pt): Pt => [x1 + x2, y1 + y2];

export interface Props {
  size: { width: number; height: number };
  tree: Tree;
  key?: number | string;
}

const Splyt3dViewer: React.SFC<Props> = props => {
  const containerEl = useRef(null);

  const [threeApp, setThreeApp] = useState<ThreeApp | undefined>(undefined);

  const [drag, setDrag] = useState<{
    current: Pt;
    totalFinalized: Pt;
  }>({
    current: [0, 0],
    totalFinalized: [0, 0]
  });

  const bind = useDrag(state => {
    setDrag({
      current: state.dragging ? state.movement : [0, 0],
      totalFinalized: state.dragging
        ? drag.totalFinalized
        : addPts(drag.totalFinalized, drag.current)
    });
  });

  useEffect(() => {
    if (!containerEl || !containerEl.current) {
      return;
    }
    const threeApp = createThreeApp(
      (containerEl.current as unknown) as HTMLElement,
      {
        tree: props.tree,
        size: props.size,
        drag
      }
    );
    setThreeApp(threeApp);
    return () => {};
  }, [containerEl]);

  useEffect(() => {
    threeApp &&
      threeApp.update({
        tree: props.tree,
        size: props.size,
        drag
      });
  }, [props.tree, drag, threeApp, props.size]);

  return <div key={props.key} {...bind()} ref={containerEl} />;
};

export default Splyt3dViewer;
