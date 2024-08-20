import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BookListComponent } from './pages/book-list/book-list.component';

const routes: Routes = [
 {path : 'login',component:LoginComponent},
 {path:'register',component:RegisterComponent},
 {path:'activate-account',component:ActivateAccountComponent},
 {path:'book-list',component:BookListComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
