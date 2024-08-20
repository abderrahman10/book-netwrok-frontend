import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
       
        },
        {
            label: 'My Books',
            icon: 'pi  pi-address-book',
        },
        {
            label: 'My Waiting List',
            icon: 'pi pi-hourglass',
        },
        {
            label: 'My Returned Books',
            icon: 'pi pi-fw pi-user',

        },
        {
          label: 'Borrowed Books',
          icon: 'pi pi-book',

      },
        { separator: true },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out'
        }
    ];
}
}