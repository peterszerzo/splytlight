import React, { useEffect, useState, useRef } from "react";
import { useDrag } from "react-use-gesture";

import createThreeApp from "./three-app";
import { State, SetState } from "../../state";

type Pt = [number, number];

const addPts = ([x1, y1]: Pt, [x2, y2]: Pt): Pt => [x1 + x2, y1 + y2];

const ThreeDee = (props: { state: State, setState: SetState}) => {
  const containerEl = useRef(null); 

  const [ threeApp, setThreeApp ] = useState<any>(undefined);

  const [ drag, setDrag ] = useState<{
    current: Pt;
    totalFinalized: Pt;
  }>({
    current: [0, 0],
    totalFinalized: [0, 0]
  });

  const bind = useDrag(state => {
    setDrag({
      current: state.dragging ? state.movement : [0, 0],
      totalFinalized: state.dragging ? drag.totalFinalized : addPts(drag.totalFinalized, drag.current)
    });
  });

  useEffect(() => {
    if (!containerEl || !containerEl.current) {
      return;
    }
    const threeApp = createThreeApp(containerEl.current as unknown as HTMLElement, {
      global: props.state,
      drag
    });
    setThreeApp(threeApp);
    return () => {
    }
  }, [containerEl]);

  useEffect(() => {
    threeApp && threeApp.update({
      global: props.state,
      drag
    });
  }, [props.state, drag, threeApp]);

  return <div
    {...bind()}
    ref={containerEl}
  />
}

export default ThreeDee;
