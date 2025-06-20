import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { routes } from './routes';
import { initRouterTable } from './guard';

export const routerTable: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  ...initRouterTable(routes),
  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

export default () => useRoutes(routerTable);
