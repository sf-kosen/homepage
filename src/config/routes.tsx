import type { HasChildrenRoute, BaseRoute } from "../types/routes";
import { Navigate } from "react-router-dom";
import Join from "../Pages/Join";
import LT1 from "../Pages/LT1";
import LT1Register from "../Pages/LT1Register";
import VotePresenter from "../Pages/VotePresenter";

const isVotePageEnabled = import.meta.env.VITE_LT1_VOTE_ENABLED === "true";

const routes: Array<HasChildrenRoute> = [
  { 
    path: "/", element: <Navigate to="/events/lt-1" replace />, 
    meta: { visibleInNav: false } 
  },
  { 
    path: "/join", element: <Join />, 
    meta: { title: "Join", navLabel: "Join", visibleInNav: true } 
  },
  {
    path: "events", element: <Navigate to="/events/lt-1" replace />,
    meta: { visibleInNav: false },
    children: [
      {
        path: "lt-1", element: <LT1 />,
        meta: { title: "LT1", navLabel: "LT1", visibleInNav: true },
        children: [
          {
            path: "register", element: <LT1Register />,
            meta: { title: "LT1 Register", visibleInNav: false }
          },
          {
            path: "vote/presenter",
            element: isVotePageEnabled ? <VotePresenter /> : <Navigate to="/events/lt-1" replace />,
            meta: { title: "Vote Presenter", visibleInNav: false }
          }
        ]
      }
    ]
  },
];

function joinPaths(parent: string, child: string) {
  if (child === "/") return "/";
  if (child.startsWith("/")) return child;
  const p = parent === "" || parent === "/" ? "" : parent;
  return `${p}/${child}`.replace(/\/+/g, "/");
}

function flattenRoutes(route: HasChildrenRoute, parent = ""): Array<BaseRoute> {
  const fullPath = joinPaths(parent, route.path);
  const me: BaseRoute = { path: fullPath, element: route.element, meta: route.meta };
  const kids = route.children ? route.children.flatMap((child) => flattenRoutes(child, fullPath)) : [];
  return [me, ...kids];
}

export const flatRoutes: Array<BaseRoute> = routes.flatMap((route) => flattenRoutes(route, ""));
