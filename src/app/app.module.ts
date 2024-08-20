import { NgModule } from '@angular/core';
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
import { httpTokenInterceptor } from './interceptor/http-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    MenuComponent,
    BookListComponent,
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
    AvatarModule
   
  ],
  providers: [provideHttpClient(withInterceptors([httpTokenInterceptor])),MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
