import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { ITeacher } from '../../../interface/teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './teacher-table.component.html',
})
export class TeacherTableComponent { 

  @Input() ITeachers!: ITeacher[];
  @Input() page!: number;
  @Input() totalPage!: number;

  @Output() delete = new EventEmitter<number>();
  @Output() reestartPassword = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previewPage = new EventEmitter<void>();

  constructor(
    private router:Router
  ){}

  public ObItablas:String[] = [
    "Nombre",
    "Correo",
    "Celular",
    "Estatus",
    "Acciones"
  ];

  nextPageClick(){
    this.nextPage.emit();
  }

  workloadNavigate(id:number){
    this.router.navigate(["dashboard","carga-horaria", id]);
  }

  reestartPass(i: number){
    this.reestartPassword.emit(i);
  }

  deleteTeacher(item: number) {
    this.delete.emit(item);
  }

  previewPageClick(){
    this.previewPage.emit();
  }


}
