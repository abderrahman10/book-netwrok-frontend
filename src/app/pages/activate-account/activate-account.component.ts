import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  value: any;

  constructor(private authService:AuthService,private router:Router,private messageService:MessageService){}

 
  confirmAccount() {
    this.authService.activateAccount(this.value).subscribe(
      (response) => {
        console.log("OTP code response : ",response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Account has been successfully activated' }); 
        
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
      },
      (error) => {
      console.log(error.error.error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
      }
    );
  }
}
