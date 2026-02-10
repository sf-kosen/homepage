import type { ReactNode } from 'react';

type RouteMeta = {
  title?: string;
  navLabel?: string;
  visibleInNav?: boolean;
  // Reserved for future authentication/authorization logic
  protected?: boolean;
};

type BaseRoute = {
  path: string;
  element: ReactNode;
  meta?: RouteMeta;
};

type HasChildrenRoute = BaseRoute & {
  children?: Array<HasChildrenRoute>;
};

export type { BaseRoute, HasChildrenRoute, RouteMeta };
