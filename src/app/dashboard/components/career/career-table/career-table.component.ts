import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICareer } from '../../../interface/career';
import { MaterialModule } from '../../../../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './career-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerTableComponent { 

  @Input() Icareers!: ICareer[];
  @Input() page!: number;
  @Input() totalPage!: number;

  @Output() delete = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previewPage = new EventEmitter<void>();

  constructor(
    private route: Router
  ){}

  onEdit(id:number){
    this.route.navigate([`/dashboard/carrera/edit/${id}`]);
  }

  public ObItablas:String[] = [
    "Nombre",
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
