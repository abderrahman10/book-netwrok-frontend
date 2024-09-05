import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { BorrowedBooksListComponent } from './pages/borrowed-books-list/borrowed-books-list.component';
import { MyReturnedBooksComponent } from './pages/my-returned-books/my-returned-books.component';
import { authGuard } from './guard/auth.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
 {path :'login',component:LoginComponent},
 {path:'register',component:RegisterComponent},
 {path:'activate-account',component:ActivateAccountComponent},
 {path:'books-list',component:BookListComponent,canActivate:[authGuard]},
 {path:'',redirectTo:'books-list',pathMatch:'full'},
 {path:'my-books',component:MyBooksComponent,canActivate:[authGuard]},
 {path:'add-book',component:AddBookComponent,canActivate:[authGuard]},
 {path:'add-book/:bookId',component:AddBookComponent,canActivate:[authGuard]},
 {path:'my-borrowed-books',component:BorrowedBooksListComponent,canActivate:[authGuard]},
 {path:'my-returned-books',component:MyReturnedBooksComponent,canActivate:[authGuard]},



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]

})
export class AppRoutingModule { }
