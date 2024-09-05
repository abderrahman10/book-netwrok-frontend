import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackRequest } from '../pages/interfaces/FeedBackRequest';
import { PageResponseFeedbackResponse } from '../pages/interfaces/PageResponseFeedBackResponse';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  private apiUrl = 'http://localhost:8088/api/v1/feedbacks'; // Remplace par l'URL de ton API

  constructor(private http:HttpClient) { }

  


  SaveFeedBack(FeedBack:FeedbackRequest):Observable<PageResponseFeedbackResponse>{
    return this.http.post<PageResponseFeedbackResponse>(`${this.apiUrl}`,FeedBack);
  }





}

