import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { PageResponseBookResponse } from '../interfaces/PageResponseBookResponse';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  constructor(private bookService:BookService,private router:Router){}
  
  bookResponse : PageResponseBookResponse={};
  ngOnInit(): void {
    this.findAllBooks();
  }


  findAllBooks(){
    this.bookService.findAllBook().subscribe(
      (response)=>{
         console.log("get all books response",response)
         this.bookResponse=response;
      },
      (error)=>{

      }
    )
  }
}
