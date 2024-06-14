import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
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
import { ManagementHomeComponent } from "./pages/management/management-home/management-home.component";
import { ManagementCreateComponent } from "./pages/management/management-create/management-create.component";
import { ManagementUpdateComponent } from "./pages/management/management-update/management-update.component";
import { TypePeriodHomeComponent } from "./pages/type-period/type-period-home/type-period-home.component";
import { TypePeriodCreateComponent } from "./pages/type-period/type-period-create/type-period-create.component";
import { TypePeriodUpdateComponent } from "./pages/type-period/type-period-update/type-period-update.component";
import { PeriodHomeComponent } from "./pages/period/period-home/period-home.component";
import { PeriodCreateComponent } from "./pages/period/period-create/period-create.component";
import { PeriodUpdateComponent } from "./pages/period/period-update/period-update.component";
import { authGuard } from "../auth/guard/auth.guard";
import { WorkloadHomeComponent } from "./pages/workload/workload-home/workload-home.component";


export const dashboardRoute:Route[] = [
  {
    path: "",
    title: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
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
        path: "carga-horaria/:user_id",
        component: WorkloadHomeComponent
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
      },
      {
        path: "gestion",
        component: ManagementHomeComponent
      },
      {
        path: "gestion/create",
        component: ManagementCreateComponent
      },
      {
        path: "gestion/edit/:id",
        component: ManagementUpdateComponent
      },
      {
        path: "tipo-periodo",
        component: TypePeriodHomeComponent
      },
      {
        path: "tipo-periodo/create",
        component: TypePeriodCreateComponent
      },
      {
        path: "tipo-periodo/edit/:id",
        component: TypePeriodUpdateComponent
      },
      {
        path: "periodo",
        component: PeriodHomeComponent
      },
      {
        path: "periodo/create",
        component: PeriodCreateComponent
      },
      {
        path: "periodo/edit/:id",
        component: PeriodUpdateComponent
      }
    ]
  }
]
