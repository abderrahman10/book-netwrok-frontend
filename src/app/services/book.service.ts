import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponseBookResponse } from '../pages/interfaces/PageResponseBookResponse';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8088/api/v1/books'; // Remplace par l'URL de ton API

  constructor(private http:HttpClient) { }

  
  findAllBook():Observable<PageResponseBookResponse> {
    return this.http.get(`${this.apiUrl}`);

  }
}
