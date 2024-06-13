import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IModule } from '../../../interface/module';
import { IClassroom } from '../../../interface/classroom';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../../service/module.service';
import { ClassroomService } from '../../../service/classroom.service';
import { ClassroomFormComponent } from '../../../components/classroom/classroom-form/classroom-form.component';

@Component({
  selector: 'app-classroom-update',
  standalone: true,
  imports: [
    CommonModule,
    ClassroomFormComponent
  ],
  templateUrl: './classroom-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomUpdateComponent { 
  public classroom = signal<IClassroom | null>(null);
  public modules = signal<IModule[]>([]);

  constructor(
    private route: ActivatedRoute,
    private readonly moduleService: ModuleService,
    private readonly classroomService: ClassroomService
  ){}

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.moduleService.listModules().subscribe(
      {
        next:(res) =>{
          const resCareers:IModule[] = res.data.modules.map(t => ({
            id: t.id,
            nro: t.nro,
            description: t.description,            
            status: t.status,
          }));
          this.modules.set(resCareers);
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
    const matterId = this.route.snapshot.paramMap.get("id");
    this.classroomService.findClassroomById(+matterId!).subscribe(
      {
        next:(value)=> {
          this.classroom.set({
            id: value.data.classroom.id,
            description: value.data.classroom.description,
            nro: value.data.classroom.nro,
            status: value.data.classroom.status,
            module: {
              id: value.data.classroom.module.id,
              description: value.data.classroom.module.description,
              nro: value.data.classroom.module.nro,
              status: value.data.classroom.module.status
            }
          })
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

}
