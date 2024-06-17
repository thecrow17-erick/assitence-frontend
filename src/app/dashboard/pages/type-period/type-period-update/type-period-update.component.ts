import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ITypePeriod } from '../../../interface/type_period';
import { ActivatedRoute } from '@angular/router';
import { TypePeriodService } from '../../../service/type-period.service';
import { TypePeriodFormComponent } from '../../../components/type-period/type-period-form/type-period-form.component';

@Component({
  selector: 'app-type-period-update',
  standalone: true,
  imports: [
    CommonModule,
    TypePeriodFormComponent
  ],
  templateUrl: './type-period-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypePeriodUpdateComponent { 
  public typePeriod = signal<ITypePeriod | null>(null);

  constructor(
    private route: ActivatedRoute,
    private typePeriodService: TypePeriodService
  ){}

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    const moduleId = this.route.snapshot.paramMap.get("id");
    this.typePeriodService.findTypePeriodById(+moduleId!).subscribe(
      {
        next:(value)=> {
          console.log(value)
          this.typePeriod.set({
            id: value.data.typePeriod.id,
            description: value.data.typePeriod.description,
            status: value.data.typePeriod.status,
          })
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

}
