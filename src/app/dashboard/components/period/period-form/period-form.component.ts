import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPeriod, IPeriodCreate } from '../../../interface/period';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeriodService } from '../../../service/period.service';
import { Router } from '@angular/router';
import { IManagement } from '../../../interface/management';
import { ITypePeriod } from '../../../interface/type_period';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-period-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './period-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodFormComponent implements OnChanges {
    @Input() period?:IPeriod;
    @Input() managements!:IManagement[];
    @Input() typePeriods!: ITypePeriod[];

    public messageError: String[] = [];
    public periodForm: FormGroup;
  
  
    constructor(
      private readonly periodService: PeriodService,
      private location: Location,
      private router: Router
    ){
      this.periodForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        init_time: new FormControl(null, [
          Validators.required,
        ]),
        finish_time: new FormControl(null, [
          Validators.required,
        ]),
        type_period_id: new FormControl("", [
          Validators.required,
        ]),
        management_id: new FormControl("", [
          Validators.required,
        ]),
      });
    }
    formatDate(date: Date): string {
      return date.toISOString().split('T')[0];
    }
    createPeriod():void{
      const moduleBody:IPeriodCreate = {
        name: this.periodForm.value.name!,
        init_time: this.formatDate(this.periodForm.value.init_time!),
        finish_time: this.formatDate(this.periodForm.value.finish_time!),
        management_id: this.periodForm.value.management_id!,
        type_period_id: this.periodForm.value.type_period_id!,
      }
      this.periodService.createPeriod(moduleBody).subscribe(
        {
          next:(value)=>{
            console.log(value);
            this.router.navigate(["/dashboard/periodo"]);
          },
          error: (err)=>{
            console.log(err)
            console.log("ugu")
            if(err.error){
              this.messageError = err.error.message;
            }
          },
        }
      )
    }
  
    updatePeriod():void{
      const moduleBody:IPeriodCreate = {
        name: this.periodForm.value.name!,
        init_time: this.formatDate(this.periodForm.value.init_time!),
        finish_time: this.formatDate(this.periodForm.value.finish_time!),
        management_id: this.periodForm.value.management_id!,
        type_period_id: this.periodForm.value.type_period_id!,
      }
      this.periodService.updatePeriod(this.period!.id,moduleBody).subscribe(
        {
          next:(value)=>{
            console.log(value);
            this.router.navigate(["/dashboard/periodo"]);
          },
          error: (err)=>{
            console.log(err)
          },
        }
      )
    }
  
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['period'] && changes['period'].currentValue) {
        this.periodForm.patchValue({
          name: this.period? this.period.name: '' ,
          init_time: this.period? new Date(this.period.startDate): null ,
          finish_time: this.period? new Date(this.period.endDate): null ,
          management_id: this.period? this.period.management.id: '' ,
          type_period_id: this.period? this.period.typePeriod.id: '' ,
        });
      }
    }
  
    goBack(): void {
      this.location.back();
    }

}
