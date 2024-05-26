import {Route} from '@angular/router'

import {LoginComponent} from "./page/login/login.component"

export const authRoute:Route[] = [
  {
    path: "",
    title: "login",
    component: LoginComponent
  }
]