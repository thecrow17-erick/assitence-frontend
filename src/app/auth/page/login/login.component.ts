import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group(
      {
        email:'',
        password:''
      }
    )
  }

  onSubmit(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).then(
      () => {
        console.log('Usuario logueado');
        this.router.navigate(['/dashboard']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.error.message;
        console.log(this.errorMessage)
      }
    )

  }

}
