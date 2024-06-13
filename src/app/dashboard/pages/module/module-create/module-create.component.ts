import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModuleFormComponent } from '../../../components/module/module-form/module-form.component';

@Component({
  selector: 'app-module-create',
  standalone: true,
  imports: [
    CommonModule,
    ModuleFormComponent
  ],
  templateUrl: './module-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleCreateComponent { }
