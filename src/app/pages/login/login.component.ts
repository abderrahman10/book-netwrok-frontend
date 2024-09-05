import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../interfaces/AuthenticationRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Message, MessageService } from 'primeng/api';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {



constructor(
  private keycloakService:KeycloakService
){}

 async ngOnInit() {
  await this.keycloakService.init();
  await this.keycloakService.login();

}



}
