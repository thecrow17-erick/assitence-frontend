import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { IMatter } from '../../../interface/matter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matter-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './matter-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatterTableComponent {
  @Input() IMatters!: IMatter[];
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
      `/dashboard/materia/edit/${id}`
    ]);
  }

  public ObItablas:String[] = [
    "Nombre",
    "Codigo",
    "Carrera",
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
