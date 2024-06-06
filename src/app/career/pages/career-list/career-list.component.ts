import { Component } from '@angular/core';
import { CareerService } from '../../service/career.service';
import { Career } from '../../interfaces/career.interface';
import { BehaviorSubject, Observable, Subscription, from } from 'rxjs';
import { CareerDialogComponent } from '../../components/career-dialog/career-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SectionListComponent } from '../../../components/section-list/section-list.component';

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
export class CareerListComponent {

  // public careers$: Observable<Career[]>;
  public careerCreatedSubscription: Subscription = new Subscription();
  public careers$: BehaviorSubject<Career[]> = new BehaviorSubject<Career[]>([]);

  public tablas: string[] = ['Nombre', 'Estado', 'Acciones'];

  public abrirDialogo(): void {
    this.dialog.open(CareerDialogComponent);
  }

  constructor(
    private careerService: CareerService,
    public dialog: MatDialog
  ) {
    this.getCareers();
  }

  ngOnInit() {
    this.careerCreatedSubscription = this.careerService.careerCreated.subscribe(() => {
      // console.log('Recibido teacerCreated');
      // Actualizar la lista de profesores...
      this.getCareers();
    });
  }

  public getCareers(): void {
    this.careerService.getTeachers().then(response => {
      const newCareers = [];
      for (let i = 0; i < response.data.totalElements; i++) {
        const career: Career = {
          id : response.data.content[i].id,
          name: response.data.content[i].name,
          status: response.data.content[i].status,
        }
        newCareers.push(career);
      }
      this.careers$.next(newCareers); // Emitir los nuevos profesores
    });
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
    });

  }
}
