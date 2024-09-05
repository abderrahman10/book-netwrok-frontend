import { Component, OnInit } from '@angular/core';
import { PageResponseBorrowedBookResponse } from '../interfaces/PageResponseBorrowedBookResponse';
import { BookService } from '../../services/book.service';
import { BorrowedBookResponse } from '../interfaces/BorrowedBookResponse';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBackService } from '../../services/feed-back.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-borrowed-books-list',
  templateUrl: './borrowed-books-list.component.html',
  styleUrl: './borrowed-books-list.component.scss',
})
export class BorrowedBooksListComponent implements OnInit {
  visible: boolean = false;
  FeedBackvisible: boolean = false;
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse = {};
  FeedBackForm!: FormGroup;
  constructor(
    private bookService: BookService,
    private router: Router,
    private formBuilder: FormBuilder,
    private feedBackService: FeedBackService,
    private messageService:MessageService
  ) {}

  showDialog() {
    this.visible = true;
  }
  ngOnInit(): void {
    this.findAllBorrowedBooks();
    this.createForm();
  }
  createForm() {
    this.FeedBackForm = this.formBuilder.group({
      comment: ['', Validators.required],
      note: ['', Validators.required],
      bookId: ['', Validators.required],
    });
  }
  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBook().subscribe(
      (response) => {
        console.log('all borrowed book', response);
        this.borrowedBooks = response;
      },
      (error) => {
        console.log('borrowed books error', error);
      }
    );
  }

  selectBorrowBook(book: BorrowedBookResponse) {
    this.visible = true;
    this.selectedBook = book;
  }

  ApprovedBook(book: BorrowedBookResponse) {
    console.log('eeeeeeeeeeeeeeee');
  }

  saveFeedBack(book: BorrowedBookResponse) {
    const BorrowedBookId = book.id as number;
    console.log('form  vaalue', this.FeedBackForm.value);
    this.FeedBackForm.patchValue({
      bookId: BorrowedBookId,
    });

    this.feedBackService.SaveFeedBack(this.FeedBackForm.value).subscribe(
      (response) => {
        console.log('FeedBack Response:', response);
        this.bookService.returnedBorrowBook(BorrowedBookId).subscribe(
          (response) => {
            console.log('returnedBorrowBook Response:', response);
            this.messageService.add({ severity: 'error', summary: 'error', detail: 'returned Borrow Book successfully' });
          },
          (error) => {
            console.log('returnedBorrowBook error:', error);
            this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.error });

          }
        );
      },
      (error) => {
        console.log('FeedBack error:', error);
        this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.error });
      }
    );
  }

  JustReturnBook(selectedBook: BorrowedBookResponse) {
    const selectedBookId = selectedBook.id as number;
    this.bookService.returnedBorrowBook(selectedBookId).subscribe(
      (response) => {
        console.log('returnedBorrowBook Response:', response);
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'book returned successfully' });

      },
      (error) => {
        console.log('returnedBorrowBook error:', error);
        this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.error });

      }
    );
  }
}
