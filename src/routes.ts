export enum RouteName {
  Home = "Home",
  New = "New",
  Edit = "Edit",
  About = "About"
}

export type Route = HomeRoute | NewRoute | EditRoute | AboutRoute;

export type HomeRoute = {
  name: RouteName.Home;
};

export type NewRoute = {
  name: RouteName.New;
};

export type EditRoute = {
  name: RouteName.Edit;
  id: string;
};

export type AboutRoute = {
  name: RouteName.About;
};

export const newRoute: NewRoute = {
  name: RouteName.New
};

export const homeRoute: HomeRoute = {
  name: RouteName.Home
};

export const aboutRoute: AboutRoute = {
  name: RouteName.About
};

export const editRoute = (id: string): EditRoute => ({
  name: RouteName.Edit,
  id
});

export const isNewRoute = (route: Route): route is NewRoute =>
  route.name === RouteName.New;

export const isHomeRoute = (route: Route): route is HomeRoute =>
  route.name === RouteName.Home;

export const isAboutRoute = (route: Route): route is AboutRoute =>
  route.name === RouteName.About;

export const isEditRoute = (route: Route): route is EditRoute =>
  route.name === RouteName.Edit;

export const toRoute = (to?: string): Route | null => {
  const path = to || window.location.pathname;
  if (path === "/") {
    return { name: RouteName.Home };
  }
  if (path === "/new") {
    return { name: RouteName.New };
  }
  if (path.slice(0, 6) === "/edit/") {
    return { name: RouteName.Edit, id: path.slice(6) };
  }
  if (path === "/about") {
    return { name: RouteName.About };
  }
  return null;
};

export const toUrl = (route: Route): string => {
  if (isHomeRoute(route)) {
    return "/";
  }
  if (isNewRoute(route)) {
    return "/new";
  }
  if (isAboutRoute(route)) {
    return "/about";
  }
  if (isEditRoute(route)) {
    return `/edit/${route.id}`;
  }
  return "/";
};
