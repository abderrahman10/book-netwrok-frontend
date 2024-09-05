import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageResponseBookResponse } from '../interfaces/PageResponseBookResponse';
import { BookResponse } from '../interfaces/BookResponse';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
})
export class MyBooksComponent {
  value!: number;
  bookId!: number;
  isManaged = true;
  booksOwnerResponse: PageResponseBookResponse = {};
  constructor(
    private bookService: BookService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private confirmationService:ConfirmationService
  ) {}

  ngOnInit(): void {
    this.findAllBooksByOwner();
  }

  showDialog() {
    this.router.navigate(['/add-book']);
  }

  findAllBooksByOwner(): void {
    this.bookService.findBooksByOwner().subscribe(
      (FindAllOwnerBooksResponse) => {
        console.log(
          'get all books by Owner response',
          FindAllOwnerBooksResponse.content
        );
        this.booksOwnerResponse = FindAllOwnerBooksResponse;
      },
      (error) => {
        console.error('Error fetching books', error);
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
  onShowDetails() {}
  onArchive(book: BookResponse) {
    this.bookId = book.id as number;
    this.bookService.archivedBook(this.bookId).subscribe(
      (response) => {
        book.archived = !book.archived;
      },
      (error) => {
        console.log('shareable error', error);
      }
    );
  }

  onDelete(event: Event,book: BookResponse) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.bookId = book.id as number;
        this.bookService.deleteBook(this.bookId).subscribe(
          (response) => {
            console.log(response);
            window.location.reload();
                    },
          (error) => {
            console.log('delete book error', error);
          }
        );
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'book deleted', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    })
    
  }
  onShare(book: BookResponse) {
    this.bookId = book.id as number;
    this.bookService.shareableBook(this.bookId).subscribe(
      (response) => {
        book.shareable = !book.shareable;
      },
      (error) => {
        console.log('shareable error', error);
      }
    );
  }
  onEdit(book: BookResponse) {
    this.router.navigate(['add-book', book.id]);
  }
  onAddToWaitingList() {}

  onBorrow(book: BookResponse) {
    this.bookId = book.id as number;
    console.log('book id id', this.bookId);
    this.bookService.borrowBook(this.bookId).subscribe(
      (response) => {
        console.log('borrow book', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'the book has been borrowed  successfully',
        });
      },
      (error) => {
        console.log('this is error', error);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: error.error.error,
        });
      }
    );
  }
}
