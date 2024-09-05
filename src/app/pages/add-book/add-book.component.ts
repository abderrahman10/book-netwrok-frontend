import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent implements OnInit {
  errorMessages:Array<string>=[];

  selectedPicture: string | undefined;
  AddBookForm!: FormGroup;
  SelectedBookCover: any;
  isFormValid!: boolean;
  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    const bookId=this.activatedRoute.snapshot.params['bookId'];
    if(bookId){
      this.bookService.findBookById(bookId).subscribe(
        (response) => {
          console.log("Book ID response", response);
          // Populate the form with the retrieved book data
          this.AddBookForm.patchValue({
            title: response.title,
            authorName: response.authorName,
            isbn: response.isbn,
            synopsis: response.synopsis,
            shareable: response.shareable,
          });
          // If the book has a cover image, you can set it accordingly
          this.selectedPicture = 'data:image/jpg;base64,'+ response.cover;
        },
        (error)=>{
          console.log("error book by id ",error)
        }
      )
    }
  }



  selectedState: any = null;
  dropdownItems = [
    { name: 'true', code: 'true' },
    { name: 'false', code: 'false ' },
  ];

  createForm() {
    this.AddBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      isbn: ['', Validators.required],
      synopsis: ['', Validators.required],
      shareable: [false, Validators.required],
    });
    this.AddBookForm.statusChanges.subscribe(() => {
      this.isFormValid = this.AddBookForm.valid;
    });
  }

  onFileSelected(event: any) {
    this.SelectedBookCover = event.target.files[0];
    console.log(this.SelectedBookCover);
    if (this.SelectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.SelectedBookCover);
    }
  }

  addNewBook() {
    console.log('adding book form', this.AddBookForm.value);
    const bookId = this.activatedRoute.snapshot.params['bookId'];
  
    if (bookId) {
      // Mode mise à jour : Ajoutez l'ID au formulaire
      this.AddBookForm.value.id = bookId;
    }

      this.bookService.addBook(this.AddBookForm.value).subscribe(
        (response) => {
          console.log('adding book response', response);
          if(!this.selectedPicture){
            this.router.navigate(['/my-books'])
  
          }
          if (this.SelectedBookCover) {
            const bookId = response;
            this.bookService
              .saveBookCover(bookId, this.SelectedBookCover)
              .subscribe(
                (responseBookCover) => {
                  this.router.navigate(['/my-books'])
                  console.log('responseBookCover', responseBookCover);
                },
                (errorBookCover) => {
                  console.log('errorBookCover', errorBookCover);
                }
              );
          }else{
            this.router.navigate(['/my-books'])

          }
        },
        (error) => {
          if(error.error.validationErrors){
            this.errorMessages=error.error.validationErrors;
          }else{
            this.errorMessages.push(error.error.error)//the third error is a message from backend 
          }
          console.log('adding book error', error);
        }
      );
    }
   
  


  
}
