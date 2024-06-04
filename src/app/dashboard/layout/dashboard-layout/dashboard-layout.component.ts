import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import {  ItemSideNav } from '../../interface';
import { ItemSideNavComponent } from '../../components/item-side-nav/item-side-nav.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    ItemSideNavComponent
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent { 

  showFiller = false;

  public menus: ItemSideNav[] = [
    {
      title: "principal",
      link: "/dashboard/home"
    },
    {
      title: "usuarios",
      link: "/dashboard/user"
    },
    {
      link: "/dashboard/matter",
      title: "materias"
    }
  ]

}
