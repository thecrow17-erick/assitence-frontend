import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWorkload } from '../../../interface/workload';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-workload-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './workload-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadTableComponent { 

  @Input() workloads!: IWorkload[];
  @Input() page!: number;
  @Input() totalPage!: number;

  @Output() nextPage = new EventEmitter<void>();
  @Output() previewPage = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  onEdit(id:number){
    const userId = this.route.snapshot.paramMap.get("user_id");
    this.router.navigate([
      `/dashboard/carga-horaria/${userId}/ver/${id}`
    ]);
  }

  public ObItablas:String[] = [
    "Id",
    "Docente",
    "Periodo",
    "Duracion",
    "Gestion",
    "Tipo de periodo",
    "Acciones"
  ];

  nextPageClick(){
    this.nextPage.emit();
  }

  previewPageClick(){
    this.previewPage.emit();
  }

}
