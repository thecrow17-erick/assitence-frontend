import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { ManagementFormComponent } from '../../../components/management/management-form/management-form.component';

@Component({
  selector: 'app-management-create',
  standalone: true,
  imports: [
    CommonModule,
    ManagementFormComponent
  ],
  templateUrl: './management-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementCreateComponent {}