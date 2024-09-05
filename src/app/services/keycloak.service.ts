import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../pages/interfaces/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak: Keycloak | undefined;
 private profile: UserProfile  | undefined;;

 get getProfile(): UserProfile | undefined{
  return this.profile;
 }


  get getkeycloak(){
    if(!this.keycloak){
      this.keycloak=new Keycloak({
         url:'http://localhost:9090',
         realm: 'book-social-network',
         clientId:'bsn'
      })
    }
    return this.keycloak;
  }
  constructor() { }

  async init(){
   const authenticated= await this.getkeycloak?.init({
   onLoad: 'login-required',
   //"checkLoginIframe":false
   });
   if(authenticated){
  this.profile=(await this.getkeycloak.loadUserProfile()) as UserProfile;
  this.profile.token=this.keycloak?.token; // or you can use tokenParsed because it contains infos about token  
   }
  }


login(){
  return this.getkeycloak.login();
}
logout(){
  return this.getkeycloak.logout();
}
}
