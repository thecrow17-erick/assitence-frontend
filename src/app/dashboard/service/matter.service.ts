import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { IMatterRes,IMatterResponse,IMatterCreate } from '../interface/matter';

@Injectable({
  providedIn: 'root'
})
export class MatterService {

  apiUrl = `${environment.apiUrl}/matter`;
  matterCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  getMatters({limit,skip}:IValuePagination): Observable<IResponse<IPagination<IMatterRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<IMatterRes>>>(this.apiUrl, {params,headers: header})
  }

  createMatter(data: IMatterCreate): Observable<IResponse<IMatterResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IMatterResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.matterCreated.next();
      })
    );
  }

  findMatterById(id:number): Observable<IResponse<IMatterResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/${id}`
    return this.http.get<IResponse<IMatterResponse>>(urlId, {headers: header})
  }

  public updateMatter(id: number, body: IMatterCreate): Observable<IResponse<IMatterResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IResponse<IMatterResponse>>(url, body, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.matterCreated.next();
      })
    );
  }

  public deleteMatter(id : number): Observable<IResponse<IMatterResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IResponse<IMatterResponse>>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.matterCreated.next();
      })
    );
  }
}
