import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CareerService } from '../../../service/career.service';
import { Router } from '@angular/router';
import { ICareer, ICreateCareer } from '../../../interface/career';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-career-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './career-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerFormComponent implements OnChanges{ 
  @Input() career?: ICareer;

  public messageError: String[] = [];
  public teacherForm: FormGroup;

  constructor(
    private readonly careerService: CareerService,
    private location: Location,
    private router: Router
  ){
    this.teacherForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['career'] && changes['career'].currentValue) {
      this.teacherForm.patchValue({
        name: this.career ? this.career.name : ''
      });
    }
  }

  public createCareer():void{
    const createBodyTeacher:ICreateCareer = {
      name: this.teacherForm.value.name!,
    }
    console.log(createBodyTeacher)
    this.careerService.createCareer(createBodyTeacher).subscribe(
      {
        next: (value)=> {
          console.log(value)
          this.router.navigate(["/dashboard/carrera"]);
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

  public updateCareer():void{
    const update :ICreateCareer = {
      name: this.teacherForm.value.name!
    }
    this.careerService.updateCareer(this.career!.id,update).subscribe(
      {
        next:(value)=>{
          console.log(value)
          this.router.navigate(["/dashboard/carrera"]);
        },
        error: (err)=>{
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

  goBack(): void {
    this.location.back();
  }
}
