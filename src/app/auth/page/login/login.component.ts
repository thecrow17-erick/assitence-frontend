import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
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

    this.authService.login(email, password).subscribe(
      {
        next:(res)=>{
          console.log(res)
          const role:String[] = res.data.user.roles.map(r => r.name);
          const roleInclude = role.includes("ADMIN");

          if(roleInclude){
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user.id.toString());
            this.router.navigate(["/dashboard"]);
          }
        },
        error:(err)=>{
          console.log(err)
        },
      }
    )

  }

}
