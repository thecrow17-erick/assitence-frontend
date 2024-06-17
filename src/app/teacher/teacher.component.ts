import { Component } from '@angular/core';
import { TeacherService } from './service/teacher.service';
import { Teacher, Data } from './interface/teacher.interface';
import { CommonModule } from '@angular/common';
import { trigger } from '@angular/animations';
import { BehaviorSubject, Observable, Subscription, from, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';
import { ConstantPool } from '@angular/compiler';
import { SectionListComponent } from '../components/section-list/section-list.component';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    CommonModule,
    SectionListComponent
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

  private teacherCreatedSubscription: Subscription = new Subscription();
  public teachers$: BehaviorSubject<Teacher[]> = new BehaviorSubject<Teacher[]>([]);
  //Tablas para mostrar en el CRUD osea las columnas
  public tablas: string[] = ['Nombre', 'Email', 'Telefono', 'Estado', 'Acciones'];

  constructor(
    private teacherservice:TeacherService,
    public dialog: MatDialog
  ) {
    this.getTeachers();
  }

  ngOnInit() {
    this.teacherCreatedSubscription = this.teacherservice.teacherCreated.subscribe(() => {
      console.log('Recibido teacerCreated');
      // Actualizar la lista de profesores...
      this.getTeachers();
    });
  }

  public abrirDialogo(): void {
    this.dialog.open(TeacherDialogComponent);
  }

  public getTeachers(): void {
    this.teacherservice.getTeachers().then(response => {
      const newTeachers = [];
      for (let i = 0; i < response.data.totalElements; i++) {
        const teacher: Teacher = {
          id : response.data.content[i].id,
          name: response.data.content[i].name,
          email: response.data.content[i].email,
          phone: response.data.content[i].phone,
          status: response.data.content[i].status,
        }
        newTeachers.push(teacher);
      }
      this.teachers$.next(newTeachers); // Emitir los nuevos profesores
    });
  }

  public editTeacher(teacher: Teacher): void {
    this.dialog.open(TeacherDialogComponent, {
      data: teacher
    });
  }

  public deleteTeacher(id: number): void {
    // console.log('Eliminando profesor', id);
    this.teacherservice.deleteTeacher(id).subscribe(() => {
      // console.log('Profesor eliminado');
    });
  }

  ngOnDestroy() {
    this.teacherCreatedSubscription.unsubscribe();
  }


}
