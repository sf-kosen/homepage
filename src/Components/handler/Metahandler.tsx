import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { flatRoutes } from "../../config/routes";

export default function MetaHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    const match = flatRoutes.find(r => r.path === pathname);
    if (match?.meta?.title) document.title = match.meta.title;
  }, [pathname]);
  return null;
}
