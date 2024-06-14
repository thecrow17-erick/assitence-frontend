import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { ITypePeriodCreate, ITypePeriodList, ITypePeriodRes, ITypePeriodResponse } from '../interface/type_period/';

@Injectable({
  providedIn: 'root'
})
export class TypePeriodService {

  apiUrl = `${environment.apiUrl}/type-period`;
  typePeriodCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  public getTypePeriods({limit,skip}:IValuePagination): Observable<IResponse<IPagination<ITypePeriodRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<ITypePeriodRes>>>(this.apiUrl, {params,headers: header})
  } 

  public createTypePeriod(data: ITypePeriodCreate): Observable<IResponse<ITypePeriodResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<ITypePeriodResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.typePeriodCreated.next();
      })
    );
  }

  public listTypePeriod(): Observable<IResponse<ITypePeriodList>>{
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/list-select`
    return this.http.get<IResponse<ITypePeriodList>>(urlId, {headers: header})
  }

  public findTypePeriodById(id:number): Observable<IResponse<ITypePeriodResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/${id}`
    return this.http.get<IResponse<ITypePeriodResponse>>(urlId, {headers: header})
  }

  public deleteTypePeriod(id : number): Observable<ITypePeriodResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<ITypePeriodResponse>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.typePeriodCreated.next();
      })
    );
  }

  public updateTypePeriod(id: number, body: ITypePeriodCreate): Observable<IResponse<ITypePeriodResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IResponse<ITypePeriodResponse>>(url, body, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.typePeriodCreated.next();
      })
    );
  }

}
