import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { IClassroom, IClassroomCreate } from '../../../interface/classroom';
import { IModule } from '../../../interface/module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassroomService } from '../../../service/classroom.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ClassroomQRDialogComponent } from '../classroom-QR-dialog/classroom-QR-dialog.component';

@Component({
  selector: 'app-classroom-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './classroom-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomFormComponent { 
  @Input() classroom?: IClassroom;
  @Input() modules!: IModule[];

  public messageError: String[] = [];
  public classroomForm: FormGroup;

  constructor(
    private readonly classroomService: ClassroomService,
    private location: Location,
    private router: Router
  ){
    this.classroomForm = new FormGroup({
      nro: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]),
      module_id: new FormControl('',[
        Validators.required
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['classroom'] && changes['classroom'].currentValue) {
      this.classroomForm.patchValue({
        nro: this.classroom ? this.classroom.nro : '',
        description: this.classroom ? this.classroom.description : '',
        module_id: this.classroom ? this.classroom.module.id : ''
      });
    }
  }

  createMatter():void{
    const createBodyClassroom:IClassroomCreate = {
      nro: this.classroomForm.value.nro!,
      description: this.classroomForm.value.description!,
      module_id: this.classroomForm.value.module_id!
    }
    this.classroomService.createClassroom(createBodyClassroom).subscribe(
      {
        next:(value) =>{
          console.log(value)
          this.router.navigate(["/dashboard/aula"]);
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

  updateMatter():void{
    const createBodyClassroom:IClassroomCreate = {
      nro: this.classroomForm.value.nro!,
      description: this.classroomForm.value.description!,
      module_id: this.classroomForm.value.module_id!
    }
    this.classroomService.updateClassroom(this.classroom!.id,createBodyClassroom).subscribe(
      {
        next:(value) =>{
          console.log(value)
          this.router.navigate(["/dashboard/aula"]);
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

}
