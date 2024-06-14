import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { IPeriodCreate, IPeriodList, IPeriodRes, IPeriodResponse } from '../interface/period';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  apiUrl = `${environment.apiUrl}/period`;
  periodCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  public getPeriods({limit,skip}:IValuePagination): Observable<IResponse<IPagination<IPeriodRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<IPeriodRes>>>(this.apiUrl, {params,headers: header})
  } 

  public createPeriod(data: IPeriodCreate): Observable<IResponse<IPeriodResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IPeriodResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.periodCreated.next();
      })
    );
  }

  public listPeriod(): Observable<IResponse<IPeriodList>>{
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/list-select`
    return this.http.get<IResponse<IPeriodList>>(urlId, {headers: header})
  }

  public findPeriodById(id:number): Observable<IResponse<IPeriodResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/${id}`
    return this.http.get<IResponse<IPeriodResponse>>(urlId, {headers: header})
  }

  public deletePeriod(id : number): Observable<IPeriodResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IPeriodResponse>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.periodCreated.next();
      })
    );
  }

  public updatePeriod(id: number, body: IPeriodCreate): Observable<IResponse<IPeriodResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IResponse<IPeriodResponse>>(url, body, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.periodCreated.next();
      })
    );
  }

}
