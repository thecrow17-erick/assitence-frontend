import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";

import { AuthService } from '../../service/auth.service';
import { LoginBody } from '../../interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent{ 
  
  constructor(
    private authService: AuthService

  ){
    console.log(this.loginForm)
  }
  public loginForm = new FormGroup({
    email: new FormControl<string>("",[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>("",[
      Validators.required,
      Validators.minLength(3)
    ])
  })

  get currentLogin(): LoginBody {
    const body = this.loginForm.value as LoginBody;
    return body;
  }
  
  onSubmit():void{
    if(this.loginForm.invalid) return;
    console.log("guug")
    this.authService.authLogin(this.currentLogin)
  }
}
