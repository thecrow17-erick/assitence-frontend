import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IModule } from '../../../interface/module';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../../service/module.service';
import { ModuleFormComponent } from '../../../components/module/module-form/module-form.component';

@Component({
  selector: 'app-module-update',
  standalone: true,
  imports: [
    CommonModule,
    ModuleFormComponent
  ],
  templateUrl: './module-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleUpdateComponent {

  public module = signal<IModule | null>(null);

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService
  ){}

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    const moduleId = this.route.snapshot.paramMap.get("id");
    this.moduleService.findModuleById(+moduleId!).subscribe(
      {
        next:(value)=> {
          console.log(value)
          this.module.set({
            id: value.data.module.id,
            description: value.data.module.description,
            nro: value.data.module.nro,
            status: value.data.module.status,
          })
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

}
