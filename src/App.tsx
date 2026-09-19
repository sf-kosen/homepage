import type { HasChildrenRoute, BaseRoute } from "./types/routes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MetaHandler from "./Components/handler/Metahandler";
import Join from "./Pages/Join";
import LT1 from "./Pages/LT1";
import LT1Register from "./Pages/LT1Register";
import VotePresenter from "./Pages/VotePresenter";
import LT2 from "./Pages/LT2";
import LT2Register from "./Pages/LT2Register";
import LT2VotePresenter from "./Pages/LT2VotePresenter";
import { lt2Event } from "./content/lt2Event";

const isVotePageEnabled = import.meta.env.VITE_LT1_VOTE_ENABLED === "true";
const isLt2VotePageEnabled = import.meta.env.VITE_LT2_VOTE_ENABLED === "true";



const routes: Array<HasChildrenRoute> = [
  {
    path: "/", element: <Navigate to="/events/lt2" replace />,
    meta: { visibleInNav: false }
  },
  { 
    path: "/join", element: <Join />, 
    meta: { title: "Join", navLabel: "Join", visibleInNav: true } 
  },
  {
    path: "events", element: <Navigate to="/events/lt2" replace />,
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
      },
      {
        path: "lt2", element: <LT2 />,
        meta: { title: lt2Event.name, navLabel: "LT2", visibleInNav: true },
        children: [
          {
            path: "register", element: <LT2Register />,
            meta: { title: `${lt2Event.name} 登壇登録`, visibleInNav: false }
          },
          {
            path: "vote/presenter",
            element: isLt2VotePageEnabled ? <LT2VotePresenter /> : <Navigate to="/events/lt2" replace />,
            meta: { title: `${lt2Event.name} 投票`, visibleInNav: false }
          }
        ]
      },
      {
        path: "lt-2",
        element: <Navigate to="/events/lt2" replace />,
        meta: { visibleInNav: false }
      },
      {
        path: "lt-2/register",
        element: <Navigate to="/events/lt2/register" replace />,
        meta: { visibleInNav: false }
      },
      {
        path: "lt-2/vote/presenter",
        element: <Navigate to="/events/lt2/vote/presenter" replace />,
        meta: { visibleInNav: false }
      }
    ]
  },
]


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

function App() {
  return (
    <BrowserRouter>
      <MetaHandler />

      <Routes>
        {flatRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
