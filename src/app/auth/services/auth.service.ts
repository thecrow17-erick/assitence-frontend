import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl =  `${environment.apiUrl}/auth/login`;

  constructor( private http: HttpClient) { }

  async login(email: string , password:string): Promise<void>{

    const body = { email : email, password: password};

    this.http.post<AuthResponse>(this.loginUrl, body).subscribe(
      (Response) => {
        console.log(Response);
        localStorage.setItem('token', Response.data.token);
        // console.log( localStorage.getItem('token'));
      }
    )
  }


}
