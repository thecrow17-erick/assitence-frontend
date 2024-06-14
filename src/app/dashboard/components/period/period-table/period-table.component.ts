import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPeriod } from '../../../interface/period';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-period-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './period-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodTableComponent {
  @Input() IPeriods!: IPeriod[];
  @Input() page!: number;
  @Input() totalPage!: number;

  @Output() delete = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previewPage = new EventEmitter<void>();

  constructor(
    private route: Router
  ){}

  onEdit(id:number){
    this.route.navigate([
      `/dashboard/periodo/edit/${id}`
    ]);
  }

  public ObItablas:String[] = [
    "Nombre",
    "Fecha inicio",
    "Fecha final",
    "Tipo periodo",
    "Gestion",
    "Estatus",
    "Acciones"
  ];

  nextPageClick(){
    this.nextPage.emit();
  }

  deleteTeacher(item: number) {
    this.delete.emit(item);
  }

  previewPageClick(){
    this.previewPage.emit();
  }

}
