import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { TeacherResponse } from '../../teacher/interface/teacher.interface';
import { CareerResponse } from '../interfaces/career.interface';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  apiUrl = `${environment.apiUrl}/career`;
  careerCreated = new Subject<void>();

  constructor( private http: HttpClient) { }

  async getTeachers(): Promise<CareerResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const skip = 0;
    const limit = 10;
    const url = `${this.apiUrl}?skip=${skip}&limit=${limit}`;

    return new Promise((resolve, reject) => {
      this.http.get<TeacherResponse>(url, {headers: header}).subscribe(
        (response) => {
          // console.log(response);
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createCareer(data: any): Observable<TeacherResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<TeacherResponse>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.careerCreated.next();
      })
    );


  }

  public deleteCareer(id : number): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<any>(url , {headers: header}).pipe(
      tap(response => {
        // console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.careerCreated.next();
      })
    );
  }

  public updateCareer(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${data.id}`;
    const body = {
      name: data.name
    };
    return this.http.put<any>(url, body, {headers: header}).pipe(
      tap(response => {
        // console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.careerCreated.next();
      })
    );
  }





}
