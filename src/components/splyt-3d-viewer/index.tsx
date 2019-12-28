import React, { useEffect, useState, useRef } from "react";

import { useSimpleDrag } from "../hooks";
import createThreeApp, { ThreeApp } from "./three-app";
import { Tree } from "../../splyt";

export interface Props {
  size: { width: number; height: number };
  canvasRef?: (node: HTMLCanvasElement | null) => void;
  tree: Tree;
}

const Splyt3dViewer: React.SFC<Props> = props => {
  const containerEl = useRef(null);

  const [threeApp, setThreeApp] = useState<ThreeApp | undefined>(undefined);

  const { dragContainerAttrs, drag } = useSimpleDrag();

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
    if (props.canvasRef) {
      props.canvasRef(((containerEl.current as unknown) as HTMLElement).querySelector("canvas"));
    }
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

  return (
    <div
      {...dragContainerAttrs}
      ref={containerEl}
      style={{ width: props.size.width, height: props.size.height }}
    />
  );
};

export default Splyt3dViewer;
