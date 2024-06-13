import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { ICareer } from '../../../interface/career';
import { IMatter } from '../../../interface/matter';
import { MatterService } from '../../../service/matter.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMatterCreate } from '../../../interface/matter/matter.interface';

@Component({
  selector: 'app-matter-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './matter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatterFormComponent implements OnChanges {
  @Input() matter?: IMatter;
  @Input() career!: ICareer[];

  public messageError: String[] = [];
  public matterForm: FormGroup;

  constructor(
    private readonly matterService: MatterService,
    private location: Location,
    private router: Router
  ){

    this.matterForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      code: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      career_id: new FormControl('',[
        Validators.required,
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['career'] && changes['career'].currentValue) {
      this.matterForm.patchValue({
        name: this.matter ? this.matter.name : '',
        code: this.matter ? this.matter.code : '',
        career_id: this.matter ? this.matter.career.id : ''
      });
    }
  }

  createMatter():void{
    const createBodyMatter:IMatterCreate = {
      name: this.matterForm.value.name!,
      code: this.matterForm.value.code!,
      career_id: this.matterForm.value.career_id!
    }
    this.matterService.createMatter(createBodyMatter).subscribe(
      {
        next:(value) =>{
          console.log(value)
          this.router.navigate(["/dashboard/materia"]);
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

  updateMatter():void{
    const createBodyMatter:IMatterCreate = {
      name: this.matterForm.value.name!,
      code: this.matterForm.value.code!,
      career_id: this.matterForm.value.career_id!
    }
    this.matterService.updateMatter(this.matter!.id,createBodyMatter).subscribe(
      {
        next:(value) =>{
          console.log(value)
          this.router.navigate(["/dashboard/materia"]);
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
