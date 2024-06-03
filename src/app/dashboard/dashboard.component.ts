import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {



  private secciones:string[]=[
    "Docentes",
    "Cargas Horarias",
    "Carrera ",
    "Materia ",
    "Gestion",
    "Periodos",
    "Modulos",
    "Reportes",
  ];

  private router: string[] = [
    "docente",
    "carga-horaria",
    "carrera",
    "materia",
    "gestion",
    "periodo",
    "modulo",
    "reporte",
  ]

  private iconos : string[] = [
    "person_2",
    "pending_actions",
    "receipt_long",
    "subject",
    "task",
    "date_range",
    "view_module",
    "assessment",
  ];
  constructor(
    private ruta: Router
  ) {

  }

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

  public navegarA( route : string ):void{
    console.log(route);
    this.ruta.navigate(['/dashboard' , route]);
  }


}
