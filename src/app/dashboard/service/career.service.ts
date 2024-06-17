import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagination, IResponse, IValuePagination } from '../../interface';
import { Observable, Subject, tap } from 'rxjs';
import { ICareerRes, ICareerResponse, ICareerSelectList, ICreateCareer } from '../interface/career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  apiUrl = `${environment.apiUrl}/career`;
  careerCreated = new Subject<void>();

  constructor( private http: HttpClient) { }

  getCareer({limit,skip}:IValuePagination): Observable<IResponse<IPagination<ICareerRes>>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("skip",skip)
      .set('limit',limit)

    return this.http.get<IResponse<IPagination<ICareerRes>>>(this.apiUrl, {params,headers: header})
  }

  getListCareer(): Observable<IResponse<ICareerSelectList>> {
    const token = localStorage.getItem('token');
    const urlId = `${this.apiUrl}/list-select`
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IResponse<ICareerSelectList>>(urlId, {headers: header})
  }

  createCareer(data: ICreateCareer): Observable<IResponse<ICareerResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<ICareerResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.careerCreated.next();
      })
    );
  }
  findCareerById(id:number): Observable<IResponse<ICareerResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const urlId = `${this.apiUrl}/${id}`
    return this.http.get<IResponse<ICareerResponse>>(urlId, {headers: header})
  }

  public deleteCareer(id : number): Observable<ICareerRes> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<any>(url , {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.careerCreated.next();
      })
    );
  }

  public updateCareer(id: number, body: ICreateCareer): Observable<IResponse<ICareerResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IResponse<ICareerResponse>>(url, body, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        // console.log('Emitiendo TeacherCreated...');
        this.careerCreated.next();
      })
    );
  }

}
