import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { IWorkloadRes } from '../interface/workload';

@Injectable({
  providedIn: 'root'
})
export class WorkloadService {
  apiUrl = `${environment.apiUrl}/workload`;
  typePeriodCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  public getWorkloads(id:number,{limit,skip}:IValuePagination): Observable<IResponse<IPagination<IWorkloadRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("user_id", id)
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<IWorkloadRes>>>(this.apiUrl, {params,headers: header})
  } 
}
