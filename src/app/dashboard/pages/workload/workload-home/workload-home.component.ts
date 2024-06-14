import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workload-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './workload-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadHomeComponent {

  constructor(
    private readonly router: Router
  ) {}

  public onNavCreate(){
    this.router.navigate(["/dashboard/docente/create"]);
  }
}
