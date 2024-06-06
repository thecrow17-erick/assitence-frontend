import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeacherService } from '../../service/teacher.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-teacher-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './teacher-dialog.component.html',
  styleUrl: './teacher-dialog.component.css'
})
export class TeacherDialogComponent {
  //atributos para crear un Docente+
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  status: boolean = true;

  constructor( private teacherService: TeacherService, @Inject(MAT_DIALOG_DATA) public data?:any) {
    if(data){
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.status = false;
    }
  }

  public createTeacher(): void {
      console.log('Crear profesor');
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone
      };
      this.teacherService.createTeacher(data).subscribe((response) => {
        console.log(response);
        this.teacherService.teacherCreated.next();
      });
  }

  public updateTeacher(): void {
      console.log('Actualizar profesor');
  }


}
