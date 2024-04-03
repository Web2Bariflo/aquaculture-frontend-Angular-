import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
constructor(private router:Router, private auth: AuthenticationService, private dataSharingService: DataSharingService){}
errorMsg=''
forgotEmail:any;

  async onForgot(){

    if (this.forgotEmail !== undefined){
      await this.auth.onForgotPassword(this.forgotEmail).subscribe(response=>
        {console.log(response)
          this.dataSharingService.setOtp(response.otp);
          localStorage.setItem('otpNum',JSON.stringify(response.otp))
          this.router.navigate(['./forgot-check'])
          localStorage.setItem('forgotPass',JSON.stringify(this.forgotEmail))
        }, error=>
        console.log(error))
    
      
    }
    else{
      this.errorMsg ='*Please Enter the Email Id!'
    }

   

  }
}
