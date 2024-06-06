import { Component } from '@angular/core';
import { Matter } from '../../interfaces/matter.interface';
import { BehaviorSubject, Observable, Subscription, from } from 'rxjs';
import { MatterDialogComponent } from '../../components/matter-dialog/matter-dialog.component';
import { MatterService } from '../../service/matter.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CareerDialogComponent } from '../../../career/components/career-dialog/career-dialog.component';
import { SectionListComponent } from '../../../components/section-list/section-list.component';

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
export class MatterListComponent {

  // public careers$: Observable<Career[]>;
  public matterCreatedSubscription: Subscription = new Subscription();
  public matter$: BehaviorSubject<Matter[]> = new BehaviorSubject<Matter[]>([]);

  public tablas: string[] = ['Nombre', 'Codigo','Estado', 'Carrera',  'Acciones'];

  public abrirDialogo(): void {
    this.dialog.open(MatterDialogComponent);
  }

  constructor(
    private matterService: MatterService,
    public dialog: MatDialog
  ) {
    this.getCareers();
  }

  ngOnInit() {
    this.matterCreatedSubscription = this.matterService.matterCreated.subscribe(() => {
      // console.log('Recibido teacerCreated');
      // Actualizar la lista de profesores...
      this.getCareers();
    });
  }

  public getCareers(): void {
    this.matterService.getMatters().then(response => {
      const newMatters = [];
      for (let i = 0; i < response.data.totalElements; i++) {
        const career: Matter = {
          id : response.data.content[i].id,
          name: response.data.content[i].name,
          code: response.data.content[i].code,
          status: response.data.content[i].status,
          career: response.data.content[i].career.name

        }
        newMatters.push(career);
      }
      this.matter$.next(newMatters); // Emitir los nuevos profesores
    });
  }

  editMatter(career: any) {
    this.dialog.open(CareerDialogComponent, {
      data: career
    });
  }

  deleteMatter(id: number) {
    // console.log('Eliminando Carrera', id);
    this.matterService.deleteMatter(id).subscribe(() => {
      // console.log('Carrera eliminada');
    });

  }

}
