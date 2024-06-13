import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CareerService } from '../../../service/career.service';
import { ICareer } from '../../../interface/career';
import { ActivatedRoute } from '@angular/router';
import { CareerFormComponent } from '../../../components/career/career-form/career-form.component';

@Component({
  selector: 'app-career-update',
  standalone: true,
  imports: [
    CommonModule,
    CareerFormComponent
  ],
  templateUrl: './career-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerUpdateComponent implements OnInit { 
  public Icareer = signal<ICareer|null>(null);

  constructor(
    private route: ActivatedRoute,
    private readonly careerService:CareerService
  ) {}


  ngOnInit(): void {
    this.findByIdCareer();
  }

  private findByIdCareer(){
    const careerId = this.route.snapshot.paramMap.get("id");
    console.log(careerId)
    this.careerService.findCareerById(+careerId!).subscribe(
      {
        next:(value)=> {
          this.Icareer.update((_)=>({
            id: value.data.career.id,
            name: value.data.career.name,
            status: value.data.career.status,
          }))
          console.log(this.Icareer())
        },
        error:(err)=>{
          console.log(err);
        },
      }
    )
  }


}
