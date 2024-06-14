import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ManagementService } from '../../../service/management.service';
import { TypePeriodService } from '../../../service/type-period.service';
import { IManagement } from '../../../interface/management';
import { ITypePeriod } from '../../../interface/type_period';
import { PeriodService } from '../../../service/period.service';
import { ActivatedRoute } from '@angular/router';
import { IPeriod } from '../../../interface/period';
import { PeriodFormComponent } from '../../../components/period/period-form/period-form.component';

@Component({
  selector: 'app-period-update',
  standalone: true,
  imports: [
    CommonModule,
    PeriodFormComponent
  ],
  templateUrl: './period-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodUpdateComponent {
  public period= signal<IPeriod|null>(null);
  public managements = signal<IManagement[]>([]);
  public typePeriods = signal<ITypePeriod[]>([]);

  constructor(
    private readonly managementService: ManagementService,
    private readonly typePeriodService:TypePeriodService,
    private readonly PeriodService: PeriodService,
    private route: ActivatedRoute,
  ){
  }
  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.managementService.listManagement().subscribe(
      {
        next:(res) =>{
          const resCareers:IManagement[] = res.data.managements.map(t => ({
            id: t.id,
            description: t.description,
            name: t.name,
            status: t.status,
          }));
          this.managements.set(resCareers);
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )

    this.typePeriodService.listTypePeriod().subscribe(
      {
        next:(res) =>{
          const resCareers:ITypePeriod[] = res.data.typePeriods.map(t => ({
            id: t.id,
            description: t.description,
            status: t.status, 
          }));
          this.typePeriods.set(resCareers);
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
    const moduleId = this.route.snapshot.paramMap.get("id");
    this.PeriodService.findPeriodById(+moduleId!).subscribe(
      {
        next:(value)=>{
          this.period.set({
            id: value.data.period.id,
            endDate: value.data.period.endDate,
            startDate: value.data.period.startDate,
            name: value.data.period.name,
            status: value.data.period.status,
            management: {
              id: value.data.period.management.id,
              description: value.data.period.management.description,
              name: value.data.period.management.name,
              status: value.data.period.management.status
            },
            typePeriod:{
              id: value.data.period.id,
              description: value.data.period.typePeriod.description,
              status: value.data.period.typePeriod.status,
            }
          })
        },
      }
    )
  }


}
