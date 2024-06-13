import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CareerService } from '../../service/career.service';
import { ICareer } from '../../interfaces/career.interface';
import { BehaviorSubject, Observable, Subscription, from } from 'rxjs';
import { CareerDialogComponent } from '../../components/career-dialog/career-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SectionListComponent } from '../../../components/section-list/section-list.component';
import { IValuePagination } from '../../../interface';

@Component({
  selector: 'app-career-list',
  standalone: true,
  imports: [
    CommonModule,
    SectionListComponent
  ],
  templateUrl: './career-list.component.html',
  styleUrl: './career-list.component.css'
})
export class CareerListComponent implements OnInit,OnDestroy {

  public careerCreatedSubscription: Subscription = new Subscription();
  public careers = signal<ICareer[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);

  public tablas: string[] = ['Nombre', 'Estado', 'Acciones'];

  
  constructor(
    private careerService: CareerService,
    public dialog: MatDialog
  ) {
    this.getCareers({skip: this.pages(),limit: 6});
  }

  public abrirDialogo(): void {
    this.dialog.open(CareerDialogComponent);
  }

  ngOnInit() {
    this.careerCreatedSubscription = this.careerService.careerCreated.subscribe(() => {
      this.getCareers({skip: this.pages(),limit: 6});
    });
  }

  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getCareers({ skip: this.pages(), limit: 6 });
    }
  } 

  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getCareers({ skip: this.pages(), limit: 6 });
    }
  }

  public getCareers(value:IValuePagination): void {
    
    this.careerService.getCareer(value).subscribe(
      (res)=>{
        const resCareers:ICareer[] = res.data.content.map(c => ({
          id: c.id,
          name: c.name,
          status: c.status,
        }));
        this.careers.set(resCareers);
        this.totalPages.set(res.data.totalPages);
      }
    )
  }

  editCareer(career: any) {
    this.dialog.open(CareerDialogComponent, {
      data: career
    });
  }

  deleteCareer(id: number) {
    // console.log('Eliminando Carrera', id);
    this.careerService.deleteCareer(id).subscribe(() => {
      // console.log('Carrera eliminada');
      this.getCareers({skip: this.pages(),limit: 6});
    });
  }

  ngOnDestroy(): void {
    if (this.careerCreatedSubscription) {
      this.careerCreatedSubscription.unsubscribe();      
    }
  }
}
