import { Routes } from '@angular/router';

import {authRoute} from './auth/auth.routes'
import { dashboardRoute } from './dashboard/dashboard.routes';
import { Error404Routes } from './error404/error404.routes';

export const routes: Routes = [
  {
    path: "auth",
    children: authRoute
  },
  {
    path: "dashboard",
    children: dashboardRoute,
  },

  {
    path: '',
    redirectTo: "auth",
    pathMatch: 'full'
  },
  {
    path: 'error404',
    children: Error404Routes

  },
  {
    path: "**",
    redirectTo: "error404"
  },
];
