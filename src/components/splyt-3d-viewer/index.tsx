import React, { useEffect, useState, useRef } from "react";

import { useSimpleDrag } from "../hooks";
import createThreeApp, { ThreeApp } from "./three-app";
import { Tree } from "../../splyt";

export interface Props {
  size: { width: number; height: number };
  canvasRef?: (node: HTMLCanvasElement | null) => void;
  tree: Tree;
  style?: any;
}

const Splyt3dViewer: React.SFC<Props> = props => {
  const { size, canvasRef, tree, ...rest } = props;

  const containerEl = useRef(null);

  const [threeApp, setThreeApp] = useState<ThreeApp | undefined>(undefined);

  const { dragContainerAttrs, drag } = useSimpleDrag();

  useEffect(() => {
    if (!containerEl || !containerEl.current) {
      return;
    }
    if (!threeApp) {
      const threeApp = createThreeApp(
        (containerEl.current as unknown) as HTMLElement,
        {
          tree,
          size,
          drag
        }
      );
      setThreeApp(threeApp);
      if (canvasRef) {
        canvasRef(
          ((containerEl.current as unknown) as HTMLElement).querySelector(
            "canvas"
          )
        );
      }
      return () => {};
    } else {
      threeApp.update({
        tree,
        size,
        drag
      });
    }
  }, [tree, drag, threeApp, size, containerEl, canvasRef]);

  return (
    <div
      {...dragContainerAttrs}
      ref={containerEl}
      style={{ width: size.width, height: size.height }}
      {...rest}
    />
  );
};

export default Splyt3dViewer;
