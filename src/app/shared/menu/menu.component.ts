import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  
    constructor(private router:Router, private keycloakService:KeycloakService){}
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        // {
        //     label: 'Home',
        //     icon: 'pi pi-home',
        //     command: () => {
        //         this.router.navigate(['']);
        //       }
       
        // },
        {
            label: 'My Books',
            icon: 'pi  pi-address-book',
            command: () => {
                this.router.navigate(['my-books']);
              }
        },
        {
            label: 'library Books',
            icon: 'pi pi-hourglass',
            command: () => {
                this.router.navigate(['books-list']);
              }
        },
        {
            label: 'My Returned Books',
            icon: 'pi pi-fw pi-user',
            command: () => {
                this.router.navigate(['my-returned-books']);
              }

        },
        {
          label: 'Borrowed Books',
          icon: 'pi pi-book',
          command: () => {
            this.router.navigate(['my-borrowed-books']);
          }

      },
      {
        label: 'Login',
        icon: ' pi pi-sign-in',
        command: () => {
            this.router.navigate(['login']);
          }

    },
    {
        label: 'Register',
        icon: 'pi pi-user-plus',
        command: () => {
            this.router.navigate(['register']);
          }

    },
     
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
              this.logout();
            }
        }
    ];
}

async logout(){
  this.keycloakService.logout();
}
}