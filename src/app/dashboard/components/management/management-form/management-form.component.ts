import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IManagement, IManagementCreate } from '../../../interface/management';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagementService } from '../../../service/management.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-management-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './management-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementFormComponent implements OnChanges {
  @Input() management?:IManagement;

  public messageError: String[] = [];
  public managementForm: FormGroup;


  constructor(
    private readonly managementService: ManagementService,
    private location: Location,
    private router: Router
  ){
    this.managementForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ])
    });
  }

  createManagement():void{
    const moduleBody:IManagementCreate = {
      name: this.managementForm.value.name!,
      description: this.managementForm.value.description!
    }
    this.managementService.createManagement(moduleBody).subscribe(
      {
        next:(value)=>{
          console.log(value);
          this.router.navigate(["/dashboard/gestion"]);
        },
        error: (err)=>{
          console.log(err)
        },
      }
    )
  }

  updateManagement():void{
    const moduleBody:IManagementCreate = {
      name: this.managementForm.value.name!,
      description: this.managementForm.value.description!
    }
    this.managementService.updateManagement(this.management!.id,moduleBody).subscribe(
      {
        next:(value)=>{
          console.log(value);
          this.router.navigate(["/dashboard/gestion"]);
        },
        error: (err)=>{
          console.log(err)
        },
      }
    )
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['management'] && changes['management'].currentValue) {
      this.managementForm.patchValue({
        name: this.management ? this.management.name : '',
        description: this.management? this.management.description : ''
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
