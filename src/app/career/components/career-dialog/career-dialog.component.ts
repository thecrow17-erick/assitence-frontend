import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CareerService } from '../../service/career.service';
import { FormsModule } from '@angular/forms';
import { ICareer, ICreateCareer } from '../../interfaces';

@Component({
  selector: 'app-career-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './career-dialog.component.html',
  styleUrl: './career-dialog.component.css'
})
export class CareerDialogComponent {
  //atributos para crear un Docente+
  public career = signal<ICareer>({
    id: 0,
    name: "",
    status: false
  });


  constructor( private careerService: CareerService, @Inject(MAT_DIALOG_DATA) public data?:number) {
    if(this.data){
      this.getCareerById(this.data!);
    }

  }

  public createCareer(): void {
      console.log('Crear profesor');
      const data:ICreateCareer = {
        name: this.career.name!
      };
      this.careerService.createCareer(data).subscribe((response) => {
        this.careerService.careerCreated.next();
      });
  }
  public getCareerById(id: number){
    this.careerService.findCareerById(id).subscribe(
      (res) => {
        this.career.update((_)=>({
          id: res.data.career.id,
          name: res.data.career.name,
          status: res.data.career.status
        }))
      }
    )
  }

  public updateCareer(): void {
    this.careerService.updateCareer(this.career()).subscribe((response) => {
      console.log(response);
      this.careerService.careerCreated.next();
    });
  }


}
