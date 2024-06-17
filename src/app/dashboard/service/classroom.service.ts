import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { IClassroomCreate, IClassroomRes, IClassroomResponse, IClassroomSelect } from '../interface/classroom/';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  apiUrl = `${environment.apiUrl}/classroom`;
  classroomCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  getClassrooms({limit,skip}:IValuePagination): Observable<IResponse<IPagination<IClassroomRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<IClassroomRes>>>(this.apiUrl, {params,headers: header})
  } 

  createClassroom(data: IClassroomCreate): Observable<IResponse<IClassroomResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IClassroomResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.classroomCreated.next();
      })
    );
  }

  generateQrClassroom(id:number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const urlId = `${this.apiUrl}/${id}/generate-QR`
    return this.http.post<Blob>(urlId,{}, {headers,responseType: 'blob' as 'json'}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.classroomCreated.next();
      })
    );
  }

  listClassrooms(): Observable<IResponse<IClassroomSelect>>{
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/list-select`
    return this.http.get<IResponse<IClassroomSelect>>(urlId, {headers: header})
  }

  findClassroomById(id:number): Observable<IResponse<IClassroomResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/${id}`
    return this.http.get<IResponse<IClassroomResponse>>(urlId, {headers: header})
  }

  public deleteClassroom(id : number): Observable<IClassroomResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IClassroomResponse>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.classroomCreated.next();
      })
    );
  }

  public updateClassroom(id: number, body: IClassroomCreate): Observable<IResponse<IClassroomResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IResponse<IClassroomResponse>>(url, body, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.classroomCreated.next();
      })
    );
  }
}
