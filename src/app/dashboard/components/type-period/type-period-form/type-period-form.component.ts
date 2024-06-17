import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITypePeriod, ITypePeriodCreate } from '../../../interface/type_period';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypePeriodService } from '../../../service/type-period.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-type-period-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './type-period-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypePeriodFormComponent implements OnChanges {
  @Input() typePeriod?:ITypePeriod;

  public messageError: String[] = [];
  public typePeriodForm: FormGroup;


  constructor(
    private readonly typePeriodService: TypePeriodService,
    private location: Location,
    private router: Router
  ){
    this.typePeriodForm = new FormGroup({
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ])
    });
  }

  createTypePeriod():void{
    const moduleBody:ITypePeriodCreate = {
      description: this.typePeriodForm.value.description!
    }
    this.typePeriodService.createTypePeriod(moduleBody).subscribe(
      {
        next:(value)=>{
          console.log(value);
          this.router.navigate(["/dashboard/tipo-periodo"]);
        },
        error: (err)=>{
          console.log(err)
        },
      }
    )
  }

  updateTypePeriod():void{
    const moduleBody:ITypePeriodCreate = {
      description: this.typePeriodForm.value.description!
    }
    this.typePeriodService.updateTypePeriod(this.typePeriod!.id,moduleBody).subscribe(
      {
        next:(value)=>{
          console.log(value);
          this.router.navigate(["/dashboard/tipo-periodo"]);
        },
        error: (err)=>{
          console.log(err)
        },
      }
    )
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typePeriod'] && changes['typePeriod'].currentValue) {
      this.typePeriodForm.patchValue({
        description: this.typePeriod? this.typePeriod.description : ''
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
