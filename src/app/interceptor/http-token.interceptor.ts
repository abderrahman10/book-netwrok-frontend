import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService=inject(TokenService);
  const token=tokenService.GetToken;
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
