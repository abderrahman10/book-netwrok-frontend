import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { KeycloakService } from '../services/keycloak.service';

export const HttpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const keyCloakService=inject(KeycloakService);
  const token=keyCloakService.getkeycloak.token;
  
  if(token){
    const authReq=req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
