
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { routes } from './app.routes';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    RouterModule.forRoot([]),
    DashboardModule,
    MatDialogModule
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AppModule { }
