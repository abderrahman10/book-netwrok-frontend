import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { KeycloakService } from '../services/keycloak.service';


export const authGuard: CanActivateFn = () => {

  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  
  if (tokenService.getkeycloak.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};