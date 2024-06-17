import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { IManagementCreate, IManagementList, IManagementResponse, IMangementRes } from '../interface/management';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  apiUrl = `${environment.apiUrl}/management`;
  managementCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  public getManagements({limit,skip}:IValuePagination): Observable<IResponse<IPagination<IMangementRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<IMangementRes>>>(this.apiUrl, {params,headers: header})
  } 

  public createManagement(data: IManagementCreate): Observable<IResponse<IManagementResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IManagementResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.managementCreated.next();
      })
    );
  }

  public listManagement(): Observable<IResponse<IManagementList>>{
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/list-select`
    return this.http.get<IResponse<IManagementList>>(urlId, {headers: header})
  }

  public findManagementById(id:number): Observable<IResponse<IManagementResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/${id}`
    return this.http.get<IResponse<IManagementResponse>>(urlId, {headers: header})
  }

  public deleteManagement(id : number): Observable<IManagementResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IManagementResponse>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.managementCreated.next();
      })
    );
  }

  public updateManagement(id: number, body: IManagementCreate): Observable<IResponse<IManagementResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IResponse<IManagementResponse>>(url, body, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.managementCreated.next();
      })
    );
  }

}
