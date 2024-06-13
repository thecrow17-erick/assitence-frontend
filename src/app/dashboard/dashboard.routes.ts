import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { MatterListComponent } from "../matter/pages/matter-list/matter-list.component";
import { TeacherHomeComponent } from "./pages/teacher/teacher-home/teacher-home.component";
import { TeacherCreateComponent } from "./pages/teacher/teacher-create/teacher-create.component";
import { CareerHomeComponent } from "./pages/career/career-home/career-home.component";
import { CareerCreateComponent } from "./pages/career/career-create/career-create.component";
import { CareerUpdateComponent } from "./pages/career/career-update/career-update.component";
import { MatterHomeComponent } from "./pages/matter/matter-home/matter-home.component";
import { MatterCreateComponent } from "./pages/matter/matter-create/matter-create.component";
import { MatterUpdateComponent } from "./pages/matter/matter-update/matter-update.component";
import { ModuleHomeComponent } from "./pages/module/module-home/module-home.component";
import { ModuleCreateComponent } from "./pages/module/module-create/module-create.component";
import { ModuleUpdateComponent } from "./pages/module/module-update/module-update.component";
import { ClassroomHomeComponent } from "./pages/classroom/classroom-home/classroom-home.component";
import { ClassroomCreateComponent } from "./pages/classroom/classroom-create/classroom-create.component";
import { ClassroomUpdateComponent } from "./pages/classroom/classroom-update/classroom-update.component";


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
        component: TeacherHomeComponent,
      },
      {
        path: "docente/create",
        component: TeacherCreateComponent,
      },
      {
        path: "carrera",
        component: CareerHomeComponent
      },
      {
        path: "carrera/create",
        component: CareerCreateComponent
      },
      {
        path: "carrera/edit/:id",
        component: CareerUpdateComponent
      },
      {
        path: "materia",
        component: MatterHomeComponent
      },
      {
        path: "materia/create",
        component: MatterCreateComponent
      }
      ,
      {
        path: "materia/edit/:id",
        component: MatterUpdateComponent
      },
      {
        path: "modulo",
        component: ModuleHomeComponent
      },
      {
        path: "modulo/create",
        component: ModuleCreateComponent
      },
      {
        path: "modulo/edit/:id",
        component: ModuleUpdateComponent
      },
      {
        path: "aula",
        component: ClassroomHomeComponent
      },
      {
        path: "aula/create",
        component: ClassroomCreateComponent
      },
      {
        path: "aula/edit/:id",
        component: ClassroomUpdateComponent
      }
    ]
  }
]
