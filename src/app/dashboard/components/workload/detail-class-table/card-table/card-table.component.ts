import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { IAddClass } from '../../../../interface/workload';
import { dayWeenked } from "../../../../../../util/dayWeeked";
import { ClassroomService } from '../../../../service/classroom.service';
import { MaterialModule } from '../../../../../material/material.module';
import { IClassroom } from '../../../../interface/classroom';

@Component({
  selector: 'app-card-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './card-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTableComponent implements OnInit {
  @Input() IDay!: IAddClass;
  public classroom= signal<IClassroom | null>(null);

  constructor(
    private readonly classroomService:ClassroomService
  ){}

  ngOnInit(): void {
    this.loadClassroom();
  }

  public loadClassroom(){
    this.classroomService.findClassroomById(this.IDay.classroom_id).subscribe(
      {
        next:(res)=>{
          this.classroom.set({
            id:res.data.classroom.id,
            description: res.data.classroom.description,
            nro: res.data.classroom.nro,
            status: res.data.classroom.status,
            module: {
              description: res.data.classroom.module.description,
              id: res.data.classroom.module.id,
              nro: res.data.classroom.module.nro,
              status: res.data.classroom.module.status
            }
          })
        },
      }
    )
  }

  public removeTrailingZeros(timeString: string) {
    let cleanedString = timeString.replace(/0+$/, '');
    if (cleanedString.endsWith(':')) {
      cleanedString = cleanedString.slice(0, -1);
    }
    return cleanedString;
  }
  public toDayLabel(day: string){
    return dayWeenked.find(d => d.value === day)!.label;
  }

} 
