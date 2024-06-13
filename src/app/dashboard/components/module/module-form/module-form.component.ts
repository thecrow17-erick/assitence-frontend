import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IModule, IModuleCreate } from '../../../interface/module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuleService } from '../../../service/module.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-module-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './module-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleFormComponent implements OnChanges {
  @Input() module?:IModule;

  public messageError: String[] = [];
  public moduleForm: FormGroup;


  constructor(
    private readonly moduleService: ModuleService,
    private location: Location,
    private router: Router
  ){
    this.moduleForm = new FormGroup({
      nro: new FormControl('', [
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

  createModule():void{
    const moduleBody:IModuleCreate = {
      nro: this.moduleForm.value.nro!,
      description: this.moduleForm.value.description!
    }
    this.moduleService.createModule(moduleBody).subscribe(
      {
        next:(value)=>{
          console.log(value);
          this.router.navigate(["/dashboard/modulo"]);
        },
        error: (err)=>{
          console.log(err)
        },
      }
    )
  }

  updateModule():void{
    const moduleBody:IModuleCreate = {
      nro: this.moduleForm.value.nro!,
      description: this.moduleForm.value.description!
    }
    this.moduleService.updateCareer(this.module!.id,moduleBody).subscribe(
      {
        next:(value)=>{
          console.log(value);
          this.router.navigate(["/dashboard/modulo"]);
        },
        error: (err)=>{
          console.log(err)
        },
      }
    )
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['module'] && changes['module'].currentValue) {
      this.moduleForm.patchValue({
        nro: this.module ? this.module.nro : '',
        description: this.module? this.module.description : ''
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
