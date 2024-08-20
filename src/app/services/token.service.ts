import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  
  set SetToken(token:string){
    localStorage.setItem('token',token)
  }


get GetToken(): string {
  return localStorage.getItem('token') as string;
}
}
