import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CareerService } from '../../service/career.service';
import { FormsModule } from '@angular/forms';

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
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  status: boolean = true;

  constructor( private careerService: CareerService, @Inject(MAT_DIALOG_DATA) public data?:any) {
    if(data){
      this.id = data.id;
      this.name = data.name;
      this.status = false;
    }
  }

  public createCareer(): void {
      console.log('Crear profesor');
      const data = {
        name: this.name
      };
      this.careerService.createCareer(data).subscribe((response) => {
        console.log(response);
        this.careerService.careerCreated.next();
      });
  }

  public updateCareer(): void {
    const data = {
      id: this.id,
      name: this.name
    };

    this.careerService.updateCareer(data).subscribe((response) => {
      console.log(response);
      this.careerService.careerCreated.next();
    });
  }


}
