import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ICareer } from '../../../interface/career';
import { CareerService } from '../../../service/career.service';
import { IMatter } from '../../../interface/matter';
import { ActivatedRoute } from '@angular/router';
import { MatterService } from '../../../service/matter.service';
import { MatterFormComponent } from '../../../components/matter/matter-form/matter-form.component';

@Component({
  selector: 'app-matter-update',
  standalone: true,
  imports: [
    CommonModule,
    MatterFormComponent
  ],
  templateUrl: './matter-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatterUpdateComponent {
  public matter = signal<IMatter>({
    id: 0,
    code: "",
    career:{
      id: 0,
      name: "",
      status: false
    },
    name: "",
    status: false
  });
  public careers = signal<ICareer[]>([]);

  constructor(
    private route: ActivatedRoute,
    private readonly careerService: CareerService,
    private readonly matterService:MatterService
  ){
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.careerService.getListCareer().subscribe(
      {
        next:(res) =>{
          const resCareers:ICareer[] = res.data.careers.map(t => ({
            id: t.id,
            name: t.name,
            status: t.status,
          }));
          this.careers.set(resCareers);
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
    const matterId = this.route.snapshot.paramMap.get("id");
    this.matterService.findMatterById(+matterId!).subscribe(
      {
        next:(value)=> {
          this.matter.set({
            id: value.data.matter.id,
            code: value.data.matter.code,
            name: value.data.matter.name,
            status: value.data.matter.status,
            career: value.data.matter.career,
          })
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }
}
