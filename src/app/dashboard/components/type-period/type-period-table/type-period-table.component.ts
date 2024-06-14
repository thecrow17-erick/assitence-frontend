import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ITypePeriod } from '../../../interface/type_period';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-type-period-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './type-period-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypePeriodTableComponent { 
  @Input() ITypePeriod!: ITypePeriod[];
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
      `/dashboard/tipo-periodo/edit/${id}`
    ]);
  }

  public ObItablas:String[] = [
    "Descripcion",
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
