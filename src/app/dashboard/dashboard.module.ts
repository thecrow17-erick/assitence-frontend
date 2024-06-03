import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { routes } from '../app.routes';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // Añade RouterModule a la lista de imports
  ],
  exports: []
})
export class DashboardModule { }
