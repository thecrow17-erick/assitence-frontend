import { Routes } from '@angular/router';

import {authRoute} from './auth/auth.routes'
import { dashboardRouter } from './dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: "auth",
    children: authRoute
  },
  {
    path: "dashboard",
    children: dashboardRouter
  }
];
