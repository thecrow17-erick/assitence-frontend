import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { CareerService } from '../../../career/service/career.service';
import { ICareer } from '../../../career/interfaces';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { captureError } from 'rxjs/internal/util/errorContext';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-career-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './career-menu.component.html',
})
export class CareerMenuComponent implements OnInit {

  public dataList: ICareer[]=[];


  constructor(
    private readonly careerService: CareerService
  ){}
  ngOnInit(): void {
    this.loadData();
    console.log(this.dataList);
  }


  loadData(): void{
    this.careerService.getCareer({limit:10000,skip: 0})
    .subscribe(
      (res)=>{
        console.log(res)
        const resCareer: ICareer[] = res.data.content.map((career)=>({
          id: career.id,
          name:career.name,
          status:career.status,
        }))
        this.dataList = resCareer;
        console.log(this.dataList)
      }
    )
  }
}
