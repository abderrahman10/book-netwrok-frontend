import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AnimateModule} from 'primeng/animate';
import { TimelineModule } from 'primeng/timeline';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { InputOtpModule } from 'primeng/inputotp';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenuComponent } from './shared/menu/menu.component';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from "primeng/avatar";
import { BookListComponent } from './pages/book-list/book-list.component'; 
import { HttpTokenInterceptor } from './interceptor/http-token.interceptor';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingStarsComponent } from './pages/book-list/rating-stars/rating-stars.component';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { DialogModule } from 'primeng/dialog';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { BorrowedBooksListComponent } from './pages/borrowed-books-list/borrowed-books-list.component';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MyReturnedBooksComponent } from './pages/my-returned-books/my-returned-books.component';
import { KeycloakService } from './services/keycloak.service';

export function keycloakFactory(keycloakFactory:KeycloakService){
  return ( )=>{keycloakFactory.init();

  }
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    MenuComponent,
    BookListComponent,
    RatingStarsComponent,
    MyBooksComponent,
    AddBookComponent,
    BorrowedBooksListComponent,
    MyReturnedBooksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AnimateModule,
    TimelineModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
    InputOtpModule,
    ToastModule,
    MenubarModule,
    AvatarModule,
    CardModule,
    TagModule,
    RatingModule,
    PaginatorModule,
    DialogModule,
    ConfirmPopupModule,
    TableModule,
    MessageModule,
    InputTextareaModule
    
   
  ],
  providers: [
    HttpClient,
    provideHttpClient(withInterceptors([HttpTokenInterceptor])),
    MessageService,
    ConfirmationService,
    {
      provide: APP_INITIALIZER,
      deps:[KeycloakService],
      useFactory: keycloakFactory,
      multi:true
    }

  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
