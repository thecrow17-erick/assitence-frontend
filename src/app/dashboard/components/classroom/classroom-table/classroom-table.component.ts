import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { Router } from '@angular/router';
import { IClassroom } from '../../../interface/classroom';
import { ClassroomQRDialogComponent } from '../classroom-QR-dialog/classroom-QR-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classroom-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ClassroomQRDialogComponent
  ],
  templateUrl: './classroom-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomTableComponent {
  @Input() IClassrooms!: IClassroom[];
  @Input() page!: number;
  @Input() totalPage!: number;

  @Output() delete = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previewPage = new EventEmitter<void>();

  constructor(
    private route: Router,
    public dialog: MatDialog
  ){}

  onEdit(id:number){
    this.route.navigate([
      `/dashboard/aula/edit/${id}`
    ]);
  }

  public ObItablas:String[] = [
    "Nro",
    "Descripcion",
    "Modulo",
    "Estatus",
    "Acciones"
  ];

  openQrDialog(id: number):void{
    this.dialog.open(ClassroomQRDialogComponent, {
      width: '500px',
      height: '500px',
      data: id
    })
  }

  nextPageClick(){
    this.nextPage.emit();
  }

  deleteTeacher(item: number) {
    this.delete.emit(item);
  }

  previewPageClick(){
    this.previewPage.emit();
  }


}
