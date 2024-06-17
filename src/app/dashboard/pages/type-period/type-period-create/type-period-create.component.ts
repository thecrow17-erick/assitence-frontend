import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TypePeriodFormComponent } from '../../../components/type-period/type-period-form/type-period-form.component';

@Component({
  selector: 'app-type-period-create',
  standalone: true,
  imports: [
    CommonModule,
    TypePeriodFormComponent
  ],
  templateUrl: './type-period-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypePeriodCreateComponent { }
