import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { IModuleCreate, IModuleList, IModuleRes, IModuleResponse } from '../interface/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  apiUrl = `${environment.apiUrl}/module`;
  moduleCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  getModules({limit,skip}:IValuePagination): Observable<IResponse<IPagination<IModuleRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set("limit",limit)

    return this.http.get<IResponse<IPagination<IModuleRes>>>(this.apiUrl, {params,headers: header})
  } 

  createModule(data: IModuleCreate): Observable<IResponse<IModuleResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IModuleResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo TeacherCreated...');
        this.moduleCreated.next();
      })
    );
  }

  listModules(): Observable<IResponse<IModuleList>>{
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/list-select`
    return this.http.get<IResponse<IModuleList>>(urlId, {headers: header})
  }

  findModuleById(id:number): Observable<IResponse<IModuleResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/${id}`
    return this.http.get<IResponse<IModuleResponse>>(urlId, {headers: header})
  }

  public deleteModule(id : number): Observable<IModuleResponse> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IModuleResponse>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.moduleCreated.next();
      })
    );
  }

  public updateCareer(id: number, body: IModuleCreate): Observable<IResponse<IModuleResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IResponse<IModuleResponse>>(url, body, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.moduleCreated.next();
      })
    );
  }

}
