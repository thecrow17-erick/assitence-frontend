import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-workload-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './workload-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadTableComponent { }
