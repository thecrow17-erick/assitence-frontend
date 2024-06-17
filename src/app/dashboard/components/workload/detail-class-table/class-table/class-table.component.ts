import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../../material/material.module';
import { IAddClass } from '../../../../interface/workload';
import { CardTableComponent } from '../card-table/card-table.component';

@Component({
  selector: 'app-class-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CardTableComponent
  ],
  templateUrl: './class-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassTableComponent { 
  @Input() IClass!:IAddClass[];
  public IHead = [
    "Dia",
    "Hora de inicio",
    "Hora de fin",
    "Aula",
    "Acciones"
  ]

}
