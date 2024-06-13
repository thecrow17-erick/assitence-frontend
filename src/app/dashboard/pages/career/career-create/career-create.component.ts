import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CareerFormComponent } from '../../../components/career/career-form/career-form.component';

@Component({
  selector: 'app-career-create',
  standalone: true,
  imports: [
    CommonModule,
    CareerFormComponent
  ],
  templateUrl: './career-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerCreateComponent { }
