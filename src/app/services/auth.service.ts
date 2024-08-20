import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../pages/interfaces/AuthenticationRequest';
import { AuthenticationResponse } from '../pages/interfaces/AuthenticationResponse';
import { RegistrationRequest } from '../pages/interfaces/RegistrationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8088/api/v1/auth'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, request);
  }

  register(registrationRequest: RegistrationRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registrationRequest);
}


activateAccount(token: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/activate-account/${token}`);
}
}
