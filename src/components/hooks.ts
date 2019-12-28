import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-use-gesture";

import * as routes from "../routes";
import * as state from "../state";

export const useLink = () => {
  const currentRoute = useSelector<state.State, routes.Route | null>(
    s => s.page && s.page.route
  );
  const dispatch = useDispatch();
  return (route: routes.Route) => ({
    isActive: currentRoute && currentRoute.name === route.name,
    href: routes.toUrl(route),
    onClick: (ev: any) => {
      ev.preventDefault();
      dispatch(state.navigate(route));
    }
  });
};

type Pt = [number, number];

const addPts = ([x1, y1]: Pt, [x2, y2]: Pt): Pt => [x1 + x2, y1 + y2];

export const useSimpleDrag = () => {
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

  return {
    dragContainerAttrs: bind(),
    drag: addPts(drag.current, drag.totalFinalized)
  };
};
