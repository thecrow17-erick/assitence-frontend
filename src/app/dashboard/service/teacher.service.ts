import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { ICreateResTeacher, ICreateTeacher, IResTeacher } from '../interface/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  apiUrl = `${environment.apiUrl}/user/teacher`;
  teacherCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  getTeachers({limit,skip}:IValuePagination): Observable<IResponse<IPagination<IResTeacher>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<IResTeacher>>>(this.apiUrl, {params,headers: header})
  }

  createTeacher(data: ICreateTeacher): Observable<IResponse<ICreateResTeacher>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<ICreateResTeacher>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.teacherCreated.next();
      })
    );
  }

  public passwordReestart(id : number): Observable<IResponse<ICreateResTeacher>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.put<IResponse<ICreateResTeacher>>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo Reestart password...');
        this.teacherCreated.next();
      })
    );
  }

  public deleteTeacher(id : number): Observable<IResponse<ICreateResTeacher>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IResponse<ICreateResTeacher>>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.teacherCreated.next();
      })
    );
  }

}
