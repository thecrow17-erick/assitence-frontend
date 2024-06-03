import { Component } from '@angular/core';
import { TeacherService } from './service/teacher.service';
import { Teacher, Data } from './interface/teacher.interface';
import { CommonModule } from '@angular/common';
import { trigger } from '@angular/animations';
import { Observable, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

  public teachers$: Observable<Teacher[]>;
  public teachers:Teacher[] = [
    {
      name: 'Juan',
      email: '',
      phone: '',
      status: true
    },

  ];

  constructor(
    private teacherservice:TeacherService,
    public dialog: MatDialog
  ) {
    this.teachers$ = new Observable<Teacher[]>();
  }


  ngOnInit() {
    this.teachers$ = from(this.getTeachers());
  }

  public abrirDialogo(): void {
    this.dialog.open(TeacherDialogComponent);
  }

  public async getTeachers(): Promise<Teacher[]> {
    const response = await this.teacherservice.getTeachers();
    // console.log(response); // Imprime la respuesta para verificar su estructura

    if(response){
      const newTeachers = [];

      for (let i = 0; i < response.data.totalElements; i++) {
        const teacher: Teacher = {
          name: response.data.content[i].name,
          email: response.data.content[i].email,
          phone: response.data.content[i].phone,
          status: response.data.content[i].status,
        }

        newTeachers.push(teacher);
      }

      this.teachers = newTeachers;
    }

    // console.log(this.teachers); // Imprime el array teachers para verificar que los datos se han añadido correctamente

    return this.teachers;
  }

}
