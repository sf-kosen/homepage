import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routesByPath } from "../../config/routes";

export default function MetaHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    const match = routesByPath.get(pathname);
    if (match?.meta?.title) document.title = match.meta.title;
  }, [pathname]);
  return null;
}
