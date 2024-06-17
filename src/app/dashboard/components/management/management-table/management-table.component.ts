import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IManagement } from '../../../interface/management/management.interface';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-management-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './management-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementTableComponent {
  @Input() IManagements!: IManagement[];
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
      `/dashboard/gestion/edit/${id}`
    ]);
  }

  public ObItablas:String[] = [
    "Nombre",
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
