import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { TeacherResponse } from '../interface/teacher.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  apiUrl = `${environment.apiUrl}/user/teacher`;

  constructor( private http: HttpClient) { }

  async getTeachers(): Promise<TeacherResponse> {
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

}
