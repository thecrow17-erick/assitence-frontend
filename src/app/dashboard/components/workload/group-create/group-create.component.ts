import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../../../service/group.service';
import { IGruopCreate } from '../../../interface/workload';

@Component({
  selector: 'app-group-create',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './group-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCreateComponent { 

  public timeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ])
  });

  constructor(
    public readonly groupService:GroupService,
    public dialogRef: MatDialogRef<GroupCreateComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const bodyGroup: IGruopCreate = {
      name: this.timeForm.value.name!,
    }
    this.groupService.createGroup(bodyGroup).subscribe(
      {
        next:(value)=>{
          this.dialogRef.close();
        },
      }
    )
  }  
}
