import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { AuthResponse, Data } from '../interfaces/auth.interface';
import { IResponse } from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl =  `${environment.apiUrl}/auth/login`;

  constructor( private http: HttpClient) { }

  login(email: string , password:string): Observable<IResponse<Data>>{

    const body = { email : email, password: password};

    return this.http.post<IResponse<Data>>(this.loginUrl, body).pipe(
      tap(response => {
        console.log("logeandose")
      })
    )
  }

  logout(): void{
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }


}
