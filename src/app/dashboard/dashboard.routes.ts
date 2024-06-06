import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { TeacherComponent } from "../teacher/teacher.component";
import { CareerListComponent } from "../career/pages/career-list/career-list.component";
import { MatterListComponent } from "../matter/pages/matter-list/matter-list.component";


export const dashboardRoute:Route[] = [
  {
    path: "",
    title: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "docente",
        pathMatch: "full"
      },
      {
        path: "docente",
        component: TeacherComponent
      },
      {
        path: "carga-horaria",
        component: TeacherComponent
      },
      {
        path: "carrera",
        component: CareerListComponent
      },
      {
        path: "materia",
        component: MatterListComponent
      },
      {
        path: "gestion",
        component: TeacherComponent
      },
      {
        path: "periodo",
        component: TeacherComponent
      },
      {
        path: "modulo",
        component: TeacherComponent
      },
      {
        path: "reporte",
        component: TeacherComponent
      }
    ]
  }
]
