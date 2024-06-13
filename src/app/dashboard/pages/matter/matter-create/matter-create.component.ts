import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CareerService } from '../../../service/career.service';
import { ICareer } from '../../../interface/career';
import { MatterFormComponent } from '../../../components/matter/matter-form/matter-form.component';

@Component({
  selector: 'app-matter-create',
  standalone: true,
  imports: [
    CommonModule,
    MatterFormComponent
  ],
  templateUrl: './matter-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatterCreateComponent implements OnInit { 
  public careers = signal<ICareer[]>([]);

  constructor(
    private readonly careerService: CareerService,
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
  }
}
