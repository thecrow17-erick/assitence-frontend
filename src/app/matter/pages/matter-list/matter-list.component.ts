import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IMatter } from '../../interfaces/matter.interface';
import { BehaviorSubject, Observable, Subscription, from } from 'rxjs';
import { MatterDialogComponent } from '../../components/matter-dialog/matter-dialog.component';
import { MatterService } from '../../service/matter.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CareerDialogComponent } from '../../../career/components/career-dialog/career-dialog.component';
import { SectionListComponent } from '../../../components/section-list/section-list.component';
import { IValuePagination } from '../../../interface';

@Component({
  selector: 'app-matter-list',
  standalone: true,
  imports: [
    CommonModule,
    SectionListComponent
  ],
  templateUrl: './matter-list.component.html',
  styleUrl: './matter-list.component.css'
})
export class MatterListComponent implements OnInit,OnDestroy {

  // public careers$: Observable<Career[]>;
  public matterCreatedSubscription: Subscription = new Subscription();
  public matters = signal<IMatter[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);

  public tablas: string[] = ['Nombre', 'Codigo','Estado', 'Carrera',  'Acciones'];

  public abrirDialogo(): void {
    this.dialog.open(MatterDialogComponent);
  }

  constructor(
    private matterService: MatterService,
    public dialog: MatDialog
  ) {
    this.getMatters({skip: this.pages(),limit: 6});
  }

  ngOnInit() {
    this.matterCreatedSubscription = this.matterService.matterCreated.subscribe(() => {
      // console.log('Recibido teacerCreated');
      // Actualizar la lista de profesores...
      this.getMatters({skip: this.pages(),limit: 6});
    });
  }

  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getMatters({ skip: this.pages(), limit: 6 });
    }
  } 

  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getMatters({ skip: this.pages(), limit: 6 });
    }
  }

  public getMatters(pagination: IValuePagination): void {
    this.matterService.getMatters(pagination).subscribe(
      (res)=>{
        const resMatters: IMatter[] = res.data.content.map(matter=>({
          id: matter.id,
          name: matter.name,
          code: matter.code,
          status: matter.status,
          career: matter.career.name
        }))
        this.matters.set(resMatters);
        this.totalPages.update((_)=>res.data.totalPages);
      }
    )
  }

  editMatter(matter_id: number) {
    this.dialog.open(CareerDialogComponent, {
      data: matter_id
    });
  }

  deleteMatter(id: number) {
    // console.log('Eliminando Carrera', id);
    this.matterService.deleteMatter(id).subscribe(() => {
      // console.log('Carrera eliminada');
      this.getMatters({skip: this.pages(),limit: 6});
    });
  }
  ngOnDestroy(): void {
    if (this.matterCreatedSubscription) {
      this.matterCreatedSubscription.unsubscribe();      
    }
  }

}
