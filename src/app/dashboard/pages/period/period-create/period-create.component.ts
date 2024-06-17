import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PeriodFormComponent } from '../../../components/period/period-form/period-form.component';
import { IManagement } from '../../../interface/management';
import { ManagementService } from '../../../service/management.service';
import { TypePeriodService } from '../../../service/type-period.service';
import { ITypePeriod } from '../../../interface/type_period';

@Component({
  selector: 'app-period-create',
  standalone: true,
  imports: [
    CommonModule,
    PeriodFormComponent
  ],
  templateUrl: './period-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodCreateComponent {
  public managements = signal<IManagement[]>([]);
  public typePeriods = signal<ITypePeriod[]>([]);

  constructor(
    private readonly managementService: ManagementService,
    private readonly typePeriodService:TypePeriodService
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
  }
}
