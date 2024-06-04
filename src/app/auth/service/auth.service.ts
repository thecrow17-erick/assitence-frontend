import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IResponseLogin, LoginBody } from '../interface';
import { IResponse } from '../../../interface/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL="http://localhost:3001/api"

  constructor(
    private http: HttpClient,
  ){}

  authLogin(body: LoginBody): Observable<IResponse<IResponseLogin>>{
    try {
      return this.http.post<IResponse<IResponseLogin>>(`${this.baseURL}/auth/login`, body);
    } catch (err) {
      throw err;
    }
  }

}
