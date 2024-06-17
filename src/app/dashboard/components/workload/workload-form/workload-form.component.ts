import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DetailClassCreateComponent } from '../detail-class-create/detail-class-create.component';
import { IAddClass, IGroup } from '../../../interface/workload';
import { GroupCreateComponent } from '../group-create/group-create.component';
import { GroupService } from '../../../service/group.service';
import { PeriodService } from '../../../service/period.service';
import { IPeriod } from '../../../interface/period';
import { ClassTableComponent } from '../detail-class-table/class-table/class-table.component';

@Component({
  selector: 'app-workload-form',
  standalone: true,
  imports: [
    CommonModule,
    GroupCreateComponent,
    DetailClassCreateComponent,
    MaterialModule,
    ClassTableComponent
  ],
  templateUrl: './workload-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadFormComponent implements OnInit {
  public groups= signal<IGroup[]>([]);
  public periods= signal<IPeriod[]>([]);
  public days = signal<IAddClass[]>([]);

  constructor(
    private matDialog: MatDialog,
    private readonly groupService:GroupService,
    private readonly periodService:PeriodService
  ){
    console.log(this.days)
  }

  ngOnInit(): void {
    this.loadGroup();
    this.loadPeriod();
  }
  
  public loadGroup(){
    this.groupService.getGroups().subscribe({
      next:(value)=>{
        const bodyGroups: IGroup[] = value.data.groups.map(g => ({
          name: g.name,
          id: g.id
        }));
        this.groups.set(bodyGroups);
      },
    })
  }
  public loadPeriod(){
    this.periodService.listPeriod().subscribe(
      {
        next:(value)=>{
          const bodyPeriods: IPeriod[] = value.data.periods.map(p => ({
            id: p.id,
            name: p.name,
            endDate: p.endDate,
            startDate: p.startDate,
            status: p.status,
            management:{
              name: p.management.name, 
              description: p.management.description,
              id: p.management.id,
              status: p.management.status,
            },
            typePeriod: {
              description: p.typePeriod.description,
              id: p.typePeriod.id,
              status:p.typePeriod.status,
            }
          }))
          this.periods.set(bodyPeriods);
        },
      }
    )
  }

  
  public onCreateDetailClass(){
    this.matDialog.open(DetailClassCreateComponent,{
      width: '500px',
      height: '500px',
      data: {
        addDay: this.addDay.bind(this)
      }
    });
  }
  public onCreatedGroups(){
    this.matDialog.open(GroupCreateComponent,{
      width: '500px',
      height: '300px',
    })
  }
  public addDay(body: IAddClass){
    this.days.update((value)=> [...value,body]);
    console.log(this.days())
  }
  public deleteDay(dayDelete: IAddClass){
    this.days.update(day=> day.filter(d => 
      d.classroom_id !== dayDelete.classroom_id && 
      d.day !== dayDelete.day &&
      d.end_time !== dayDelete.end_time &&
      d.start_time !== dayDelete.start_time
    ))
  }
}
