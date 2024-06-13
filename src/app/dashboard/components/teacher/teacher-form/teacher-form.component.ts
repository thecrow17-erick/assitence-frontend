import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { TeacherService } from '../../../service/teacher.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICreateTeacher } from '../../../interface/teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './teacher-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherFormComponent{
  public messageError: String[] = [];
  public teacherForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(3)],[]),
    email: new FormControl("", [Validators.required,Validators.email],[]),
    phone: new FormControl("", [Validators.required,Validators.min(8),Validators.pattern(/^[67][0-9]{7}$/)],[])
  }) 
  constructor(
    private readonly teacherService: TeacherService,
    private location: Location,
    private router: Router
  ){}

  goBack(): void {
    this.location.back();
  }

  creatTeacher():void{
    const createBodyTeacher:ICreateTeacher = {
      email: this.teacherForm.value.email!,
      name: this.teacherForm.value.name!,
      phone: this.teacherForm.value.phone!
    }
    console.log(createBodyTeacher)
    this.teacherService.createTeacher(createBodyTeacher).subscribe(
      {
        next: (value)=> {
          console.log(value)
          this.router.navigate(["/dashboard/docente"]);
        },
        error: (err) => {
          console.log(err.error);
          if(err.error){
            this.messageError = err.error.message;
          }
          this.messageError = [
            "Ha ocurrido un error inesperado"
          ]
        },
      }
    )
  }

}

