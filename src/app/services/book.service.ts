import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponseBookResponse } from '../pages/interfaces/PageResponseBookResponse';
import { BookRequest } from '../pages/interfaces/BookRequest';
import { BookResponse } from '../pages/interfaces/BookResponse';
import { PageResponseBorrowedBookResponse } from '../pages/interfaces/PageResponseBorrowedBookResponse';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8088/api/v1/books'; // Remplace par l'URL de ton API

  constructor(private http:HttpClient) { }

  
  findAllBook(): Observable<PageResponseBookResponse> {
    // const params = new HttpParams()
    //   .set('page', page.toString())
    //   .set('size', size.toString());

    return this.http.get<PageResponseBookResponse>(`${this.apiUrl}/find-all-books`);
  }
  findBooksByOwner(): Observable<PageResponseBookResponse> {

    return this.http.get<PageResponseBookResponse>(`${this.apiUrl}/owner`);
  }

  borrowBook(bookId:number):Observable<number>{
    return this.http.post<number>(`${this.apiUrl}/borrow/${bookId}`,null);
  }

  returnedBorrowBook(bookId:number):Observable<number>{
    return this.http.patch<number>(`${this.apiUrl}/borrow/return/${bookId}`,null);
  }
 addBook(bookRequest:BookRequest):Observable<number>{
  return this.http.post<number>(`${this.apiUrl}`,bookRequest)
 }

 saveBookCover(bookId: number, file: File): Observable<void> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.patch<void>(`${this.apiUrl}/cover/${bookId}`, formData);
}

findBookById(bookId:number):Observable<BookResponse>{
  return this.http.get<BookResponse>(`${this.apiUrl}/${bookId}`);
}

archivedBook(bookId:number):Observable<number>{
  return this.http.patch<number>(`${this.apiUrl}/archived/${bookId}`,null);
}
shareableBook(bookId:number):Observable<number>{
  return this.http.patch<number>(`${this.apiUrl}/shareable/${bookId}`,null);
}

deleteBook(bookId:number):Observable<string>{
  return this.http.delete<string>(`${this.apiUrl}/delete/${bookId}`);
}

findAllBorrowedBook(): Observable<PageResponseBorrowedBookResponse> {
  // const params = new HttpParams()
  //   .set('page', page.toString())
  //   .set('size', size.toString());

  return this.http.get<PageResponseBorrowedBookResponse>(`${this.apiUrl}/borrowed`);
}

findAllReturnedBook(): Observable<PageResponseBorrowedBookResponse> {
  return this.http.get<PageResponseBorrowedBookResponse>(`${this.apiUrl}/returned`);
}



ApprovedReturnBorrowedBook(bookId:number):Observable<number>{
  return this.http.patch<number>(`${this.apiUrl}/borrow/return/approve/${bookId}`,null);
}
}
