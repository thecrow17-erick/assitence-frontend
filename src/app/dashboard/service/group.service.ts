import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from '../../interface';
import { IGroupList, IGroupResponse, IGruopCreate } from '../interface/workload';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  apiUrl = `${environment.apiUrl}/group`;
  groupCreated = new Subject<void>();
  
  constructor( private http: HttpClient) { }

  getGroups(): Observable<IResponse<IGroupList>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IResponse<IGroupList>>(this.apiUrl, {headers: header})
  }

  createGroup(data: IGruopCreate): Observable<IResponse<IGroupResponse>> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IGroupResponse>>(this.apiUrl, data, {headers: header}).pipe(
      tap(response => {
        console.log(response);
        console.log('Emitiendo CreateGroup...');
        this.groupCreated.next();
      })
    );
  }

}
