import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

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
    "Carrera ",
    "Materia ",
    "Modulos",
    "Aulas",
  ];

  private router: string[] = [
    "docente",
    "carrera",
    "materia",
    "modulo",
    "aula",

  ]

  private iconos : string[] = [
    "person_2",
    "pending_actions",
    "receipt_long",
    "view_module",
    "flight_class",
  ];
  constructor(
    private ruta: Router
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

  public navegarA(route: string): void {
    console.log(route);
    this.ruta.navigate(['/dashboard', route]);
  }


}
