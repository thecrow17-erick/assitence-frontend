import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { logout } from '../../util/logout';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  private isSideBarOpen:boolean = true;

  private secciones:string[]=[
    "Docentes",
    "Carreras ",
    "Materias ",
    "Modulos",
    "Aulas",
    "Gestiones",
    "Tipo periodos",
    "Periodos"
  ];
  
  private router: string[] = [
    "docente",
    "carrera",
    "materia",
    "modulo",
    "aula",
    "gestion",
    "tipo-periodo",
    "periodo"
  ]

  private iconos : string[] = [
    "person_2",
    "pending_actions",
    "receipt_long",
    "view_module",
    "flight_class",
    "view_cozy",
    "branding_watermark",
    "calendar_month"

  ];
  constructor(
    private ruta: Router,
    private readonly authService:AuthService
  ) {}

  public getSecciones():string[]{
    return this.secciones;
  }

  public getIcons():string[]{
    return this.iconos;
  }

  public getRouter():string[]{
    return this.router;
  }

  public getItem(){
    const secciones = this.getSecciones();
    const icons = this.getIcons();
    const router = this.getRouter();
    return secciones.map((seccion, index) => ({ seccion, icon: icons[index] , router: router[index]}));
  }

  // En tu archivo TypeScript del componente
  public toggleSidebar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  get isOpen(): boolean {
    return this.isSideBarOpen;
  }

  logout(){
    this.authService.logout();
    this.ruta.navigate(["auth"]);
  }

  public navegarA(route: string): void {
    this.ruta.navigate(['/dashboard', route]);
  }


}
