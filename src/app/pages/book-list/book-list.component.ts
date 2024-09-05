import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { PageResponseBookResponse } from '../interfaces/PageResponseBookResponse';
import { BookResponse } from '../interfaces/BookResponse';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  value!: number;
  bookId!:number
  isManaged=false;
  constructor(private bookService:BookService,private router:Router,private messageService: MessageService){}
  
  booksResponse : PageResponseBookResponse={};
  ngOnInit(): void {
    this.findAllBooks();
  }


  findAllBooks(): void {
    this.bookService.findAllBook().subscribe(
      (FindAllBooksResponse) => {
        console.log("get all books response", FindAllBooksResponse.content);
        this.booksResponse = FindAllBooksResponse;
      },
      (error) => {
        console.error("Error fetching books", error);
      }
    );
  }


  getBookCover(book: BookResponse): string {
    if (book.cover) {
      return 'data:image/jpg;base64,' + book.cover;
    } else {
      return 'https://primefaces.org/cdn/primeng/images/card-ng.jpg';
    }
  }
  onShowDetails(){

  }
  onArchive() {
    }
    onShare() {
    }
    onEdit() {
    }
    onAddToWaitingList() {
    }

    onBorrow(book:BookResponse) {
      this.bookId=book.id as number;
      console.log("book id id",this.bookId);
      this.bookService.borrowBook(this.bookId).subscribe(
        (response)=>{
          console.log("borrow book",response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'the book has been borrowed  successfully' }); 
        },
        (error)=>{
           console.log("this is error",error);
           this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.error }); 

        }
      )
    }
}
