import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { ClassroomService } from '../../../service/classroom.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgxPrintModule} from 'ngx-print'

@Component({
  selector: 'app-classroom-qr-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NgxPrintModule
  ],
  templateUrl: './classroom-QR-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomQRDialogComponent implements OnInit {
  public qrImageUrl= signal<SafeUrl | null>(null);
  public id = signal<number>(0);

  constructor(
    private readonly classroomService: ClassroomService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ClassroomQRDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?:number
  ) {
    if(this.data){
      this.id.set(this.data);
    }

  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData():void{
    this.classroomService.generateQrClassroom(this.id()).subscribe(
      {
        next:(res)=>{
          console.log(res)
          const objectUrl = URL.createObjectURL(res);
          this.qrImageUrl.set(this.sanitizer.bypassSecurityTrustUrl(objectUrl))
        },
        error:(err) =>{
          console.log(err)
        },
      }
    )
  }

  close(): void {
    this.dialogRef.close();
  }
}
