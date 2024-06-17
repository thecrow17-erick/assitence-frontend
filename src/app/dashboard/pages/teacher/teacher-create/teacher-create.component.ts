import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeacherFormComponent } from '../../../components/teacher/teacher-form/teacher-form.component';

@Component({
  selector: 'app-teacher-create',
  standalone: true,
  imports: [
    CommonModule,
    TeacherFormComponent
  ],
  templateUrl: './teacher-create.component.html',
})
export class TeacherCreateComponent {}
