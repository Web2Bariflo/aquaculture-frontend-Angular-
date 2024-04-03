import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-forgot-check',
  templateUrl: './forgot-check.component.html',
  styleUrls: ['./forgot-check.component.css']
})
export class ForgotCheckComponent implements OnInit{

  email:any;
  response:any;
  codeResponse:any;
  otp:any;
  code:any;
  error='';
  getOtp:any;

  constructor(private auth:AuthenticationService, private router:Router, private dataSharingService:DataSharingService){
    this.response = localStorage.getItem('forgotPass')
    this.email = JSON.parse(this.response)

    this.getOtp = this.dataSharingService.getOtp();
     
    this.codeResponse = localStorage.getItem('otpNum')
    this.otp = JSON.parse(this.codeResponse)

  }


  ngOnInit(): void {
   
  }

  onOTPCheck(){
    if(this.code !== undefined){
    
    console.log('Enter:', this.code)
    console.log('otp:', this.otp)
    
      if(parseInt(this.code) === this.otp){
       

        this.auth.onCheckOTP(this.email).subscribe(response=>
          {console.log(response)
          if (response.message === 'password sent to the user'){
            this.router.navigate(['./password-success'])
          }
          
          }, error=>
          console.log(error))
      }

      else{
        this.error = '*Incorrect OTP Try Again!'
      }

    }

    else{
      this.error = '*Please Enter OTP!'
    }
    
  }


}
