import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routesByPath } from "../../config/routes";

const DEFAULT_TITLE = "Web / 湘南藤沢高専";

export default function MetaHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    const match = routesByPath.get(pathname);
    document.title = match?.meta?.title ?? DEFAULT_TITLE;
  }, [pathname]);
  return null;
}
