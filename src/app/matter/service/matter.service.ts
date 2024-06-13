import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { ICreateMatter, IMatterRes, IMatterUpdate, IResponseMatter } from '../interfaces/matter.interface';
import { IPagination, IResponse, IValuePagination } from '../../interface';

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

  createMatter(data: ICreateMatter): Observable<IResponse<IResponseMatter>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IResponseMatter>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        this.matterCreated.next();
      })
    );


  }

  public deleteMatter(id : number): Observable<IResponse<IResponseMatter>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IResponse<IResponseMatter>>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.matterCreated.next();
      })
    );
  }

  public updateMatter(data: IMatterUpdate): Observable<IResponse<IResponseMatter>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${data.id}`;
    const body = {
      name: data.name,
      code: data.code,
      career_id: data.career_id
    };
    return this.http.put<IResponse<IResponseMatter>>(url, body, {headers: header}).pipe(
      tap(response => {
        // console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.matterCreated.next();
      })
    );
  }
}
