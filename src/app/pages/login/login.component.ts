import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../interfaces/AuthenticationRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

errorMsg:Array<String>=[];
loginForm!:FormGroup;

constructor(private formBuilder:FormBuilder,
  private router:Router,
  private authService:AuthService,
  private tokenService:TokenService
){}

ngOnInit() {
  this.createForm();
}

createForm() {
  this.loginForm = this.formBuilder.group({
    email:['',  Validators.required],
    password:['',  Validators.required],
  });
}

login() {
  console.log('login form:', this.loginForm.value);

  this.authService.authenticate(this.loginForm.value).subscribe(
    (res) => {
      console.log('Login Response:', res);
      this.router.navigate(['books']);
     this.tokenService.SetToken=res.token as string ;
    },
    (error) => {
      console.log('Error login', error);
      console.log('Error login', error.error.validationErrors);
      if (error.error.validationErrors) {
        this.errorMsg = error.error.validationErrors; // Assigner directement les erreurs
      } else  {
       this.errorMsg.push(error.error.error) //the third error is a message from backend 
      }
    }
  );
}
register(){
   this.router.navigate(['register']);
}


}
