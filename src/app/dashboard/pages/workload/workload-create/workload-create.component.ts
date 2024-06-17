import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkloadFormComponent } from '../../../components/workload/workload-form/workload-form.component';

@Component({
  selector: 'app-workload-create',
  standalone: true,
  imports: [
    CommonModule,
    WorkloadFormComponent
  ],
  templateUrl: './workload-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadCreateComponent { }
