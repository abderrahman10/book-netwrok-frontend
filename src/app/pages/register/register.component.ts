import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  RegisterForm!:FormGroup;
  errorMessages:Array<string>=[];

  constructor(private Formbuilder:FormBuilder,
    private router:Router,
    private registerService:AuthService

  ){}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.RegisterForm=this.Formbuilder.group({
      firstname:["",Validators.required],
      lastname:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    console.log("register form",this.RegisterForm.value)
 this.registerService.register(this.RegisterForm.value).subscribe(
  (response)=>{
    console.log("register response",response);
    this.router.navigate(['activate-account']);
  },
  (error)=>{
    console.log('register error',error);
    if(error.error.validationErrors){
      this.errorMessages=error.error.validationErrors;
    }else{
      this.errorMessages.push(error.error.error)//the third error is a message from backend 
    }
  }
 )
  }


  
  login() {
    this.router.navigate(['login']);
    }
    
}
