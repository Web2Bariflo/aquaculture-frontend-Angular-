import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.component.html',
  styleUrls: ['./forgot-email.component.css']
})


export class ForgotEmailComponent {
  forgotMob :any;
  errorMsg:any;
  constructor(private router:Router){}
  onForgot(){

    if(this.forgotMob !== undefined){
      this.router.navigate(['./forgot-email-check'])

    }
    else{
      this.errorMsg ='*Please Enter the mobile number!';
    }
  }
}
