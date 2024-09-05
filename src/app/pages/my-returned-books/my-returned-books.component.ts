import { Component, OnInit } from '@angular/core';
import { PageResponseBorrowedBookResponse } from '../interfaces/PageResponseBorrowedBookResponse';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BorrowedBookResponse } from '../interfaces/BorrowedBookResponse';

@Component({
  selector: 'app-my-returned-books',
  templateUrl: './my-returned-books.component.html',
  styleUrl: './my-returned-books.component.scss'
})
export class MyReturnedBooksComponent implements OnInit {

  visible: boolean = false;
  ReturnedBooks: PageResponseBorrowedBookResponse = {};
  constructor(
    private bookService: BookService,
    private router: Router,
    private messageService:MessageService
  ) {}


  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  findAllReturnedBooks() {
    this.bookService.findAllReturnedBook().subscribe(
      (response) => {
        console.log('all borrowed book', response);
        this.ReturnedBooks = response;
      },
      (error) => {
        console.log('borrowed books error', error);
      }
    );
  }

  ApprovedReturnedBook(book: BorrowedBookResponse) {
  if(!book.returned){
    return;
  }
 const bookId=book.id as number ; 
  this.bookService.ApprovedReturnBorrowedBook(bookId).subscribe(
    (response)=>{
     this.findAllReturnedBooks();
     this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: "returned Book Approved successfully", life: 3000 });

    },
    (error)=>{
      this.messageService.add({ severity: 'error', summary: 'Confirmed', detail: error.error.error, life: 3000 });

    }
  )


  }


}
