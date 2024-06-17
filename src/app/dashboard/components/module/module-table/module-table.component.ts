import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { Router } from '@angular/router';
import { IModule } from '../../../interface/module';

@Component({
  selector: 'app-module-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './module-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleTableComponent { 
  @Input() IModules!: IModule[];
  @Input() page!: number;
  @Input() totalPage!: number;

  @Output() delete = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previewPage = new EventEmitter<void>();

  constructor(
    private route: Router
  ){}

  onEdit(id:number){
    this.route.navigate([
      `/dashboard/modulo/edit/${id}`
    ]);
  }

  public ObItablas:String[] = [
    "NRO",
    "Descripcion",
    "Estatus",
    "Acciones"
  ];

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
