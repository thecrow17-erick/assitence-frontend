import { Routes } from '@angular/router';

import {authRoute} from './auth/auth.routes'
<<<<<<< HEAD
import { dashboardRoute } from './dashboard/dashboard.routes';
import { Error404Routes } from './error404/error404.routes';
=======
import { dashboardRouter } from './dashboard/dashboard.routes';
>>>>>>> bf5a7d0d46970d03c9851ce29ce0d863ad56bc1d

export const routes: Routes = [
  {
    path: "auth",
    children: authRoute
  },
  {
    path: "dashboard",
<<<<<<< HEAD
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
=======
    children: dashboardRouter
  }
>>>>>>> bf5a7d0d46970d03c9851ce29ce0d863ad56bc1d
];
