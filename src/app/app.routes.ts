import { Routes } from '@angular/router';

import {authRoute} from './auth/auth.routes'

export const routes: Routes = [
  {
    path: "auth",
    children: authRoute
  }
];
