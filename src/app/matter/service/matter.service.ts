import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { CareerResponse } from '../../career/interfaces/career.interface';
import { TeacherResponse } from '../../teacher/interface/teacher.interface';
import { MatterCreateResponse, MatterGetResponse } from '../interfaces/matter.interface';

@Injectable({
  providedIn: 'root'
})
export class MatterService {

  apiUrl = `${environment.apiUrl}/matter`;
  matterCreated = new Subject<void>();

  constructor( private http: HttpClient) { }

  async getMatters(): Promise<MatterGetResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const skip = 0;
    const limit = 10;
    const url = `${this.apiUrl}?skip=${skip}&limit=${limit}`;

    return new Promise((resolve, reject) => {
      this.http.get<MatterGetResponse>(url, {headers: header}).subscribe(
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

  createMatter(data: any): Observable<MatterCreateResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<MatterCreateResponse>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.matterCreated.next();
      })
    );


  }

  public deleteMatter(id : number): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<any>(url , {headers: header}).pipe(
      tap(response => {
        // console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.matterCreated.next();
      })
    );
  }

  public updateMatter(data: any): Observable<any> {
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
        this.matterCreated.next();
      })
    );
  }
}
