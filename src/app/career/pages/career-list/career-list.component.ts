import { Component } from '@angular/core';
import { CareerService } from '../../service/career.service';
import { Career } from '../../interfaces/career.interface';
import { Observable, from } from 'rxjs';
import { CareerDialogComponent } from '../../components/career-dialog/career-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-career-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './career-list.component.html',
  styleUrl: './career-list.component.css'
})
export class CareerListComponent {

  public careers$: Observable<Career[]>;

  private careers: Career[] = [
    {
      name: 'Ingeniería en Sistemas',
    },
    {
      name: 'Ingeniería en Electrónica',
    },
    {
      name: 'Ingeniería en Mecatrónica',
    }
  ];

  public abrirDialogo(): void {
    this.dialog.open(CareerDialogComponent);
  }

  constructor(
    private careerService: CareerService,
    public dialog: MatDialog
  ) {
    this.careers$ = new Observable<Career[]>();
  }

  ngOnInit() {
    this.careers$ = from(this.getCareers());
  }


  public getCareers(): Promise<Career[]> {
    return Promise.resolve(this.careers);
  }





}
