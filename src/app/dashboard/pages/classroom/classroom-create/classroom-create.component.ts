import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ModuleService } from '../../../service/module.service';
import { IModule } from '../../../interface/module';
import { ClassroomFormComponent } from '../../../components/classroom/classroom-form/classroom-form.component';

@Component({
  selector: 'app-classroom-create',
  standalone: true,
  imports: [
    CommonModule,
    ClassroomFormComponent
  ],
  templateUrl: './classroom-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomCreateComponent {
  public modules = signal<IModule[]>([]);

  constructor(
    private readonly moduleService: ModuleService,
  ){
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.moduleService.listModules().subscribe(
      {
        next:(res) =>{
          console.log(res)
          const resCareers:IModule[] = res.data.modules.map(t => ({
            id: t.id,
            description: t.description,
            nro: t.nro,
            status: t.status,
          }));
          this.modules.set(resCareers);
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
  }

}
