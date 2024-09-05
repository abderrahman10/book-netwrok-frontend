import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

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

isTokenNotValid(){
  return !this.isTokenValid();
}

isTokenValid(){
  const token=this.GetToken;
  if(!token){
    return false;
  }
  //decode the token 
  const jwtHelper=new JwtHelperService();

  //check expiry date
  const isTokenExpired=jwtHelper.isTokenExpired(token);
  if(isTokenExpired){
    localStorage.clear();
    return false;
  }
  return true;
}

}
