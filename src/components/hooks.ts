import { useDispatch, useSelector } from "react-redux";

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
      dispatch(state.navigate(routes.toUrl(route)));
    }
  });
};
