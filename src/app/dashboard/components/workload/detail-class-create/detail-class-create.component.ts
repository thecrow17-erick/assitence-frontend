import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dayWeenked } from '../../../../../util/dayWeeked';
import { IWeekdays } from '../../../../interface/weekdays.interface';
import { IAddClass } from '../../../interface/workload';
import { ClassroomService } from '../../../service/classroom.service';
import { IClassroom } from '../../../interface/classroom';

@Component({
  selector: 'app-detail-class-create',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './detail-class-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailClassCreateComponent implements OnInit {
  public days:IWeekdays[]=dayWeenked;
  public classroom= signal<IClassroom[]>([]);

  public timeForm = new FormGroup({
    time_init: new FormControl('', Validators.required),
    time_finish: new FormControl('', Validators.required),
    day:new FormControl('', Validators.required),
    classroom_id: new FormControl('', Validators.required)
  });

  constructor(
    public readonly classroomService:ClassroomService,
    public dialogRef: MatDialogRef<DetailClassCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      addDay: (body: IAddClass) => void 
    }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.loadClassroom()
  }

  public loadClassroom(){
    this.classroomService.listClassrooms().subscribe(
      {
        next:(value)=>{
          const classvalue: IClassroom[] = value.data.classrooms.map((c)=> ({
            module: {
              id: c.module.id,
              description: c.module.description,
              nro: c.module.nro,
              status: c.module.status,
            },
            id: c.id,
            description: c.description,
            nro: c.nro,
            status: c.status
          }));
          this.classroom.set(classvalue);
        },
      }
    )
  }


  onSubmit() {
    const body: IAddClass = {
      day: this.timeForm.value.day!,
      end_time: this.timeForm.value.time_finish! + ":000000000",
      start_time: this.timeForm.value.time_init! + ":000000000",
      classroom_id: +this.timeForm.value.classroom_id!
    }
    if (this.timeForm.valid) {
      this.data.addDay(body);
      this.dialogRef.close();
    }
  }
}
