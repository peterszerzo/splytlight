import { useDispatch } from "react-redux";

import * as routes from "../routes";
import { navigate } from "../state";

export const useLink = () => {
  const dispatch = useDispatch();
  return (route: routes.Route) => ({
    href: routes.toUrl(route),
    onClick: (ev: any) => {
      ev.preventDefault();
      dispatch(navigate(routes.toUrl(route)));
    }
  });
};
