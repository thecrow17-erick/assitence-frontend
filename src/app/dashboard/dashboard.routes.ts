import {Route} from '@angular/router'
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import {HomeComponent} from './pages/home/home.component'

export const dashboardRouter: Route[] = [
  {
    path: "",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "home",
        title: "home",
        component: HomeComponent
      }
    ]
  }
]