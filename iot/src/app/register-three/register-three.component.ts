import { Component } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register-three',
  templateUrl: './register-three.component.html',
  styleUrls: ['./register-three.component.css']
})
export class RegisterThreeComponent {
  yourCategory=['water', 'aqua', '3d'];

  getFullMobileAadhaar:any;

  emailData={email:'',user_cat:''}

  checkboxvalue=false

  constructor(private router: Router,private serviceDataRegister:DataSharingService,private auth:AuthenticationService) {

    this.getFullMobileAadhaar=serviceDataRegister.getAadhaarData()

   

  }

 
  userDetails:any;
   errorMsg:any;

  onMobileNext(){

    if(this.emailData.email!=='' && this.checkboxvalue!==false && this.emailData.user_cat !== ''){
      
      this.userDetails = {...this.getFullMobileAadhaar,...this.emailData}
      this.auth.onRegisterUser(this.userDetails).subscribe(response=>
        console.log(response),
        error=>
        console.log(error))
        this.serviceDataRegister.setemail({...this.getFullMobileAadhaar,...this.emailData})

      this.router.navigate(['/register-four']);

    }

    else{
      this.errorMsg = '*Please Enter all Fields Data!'
    }

    
  }
}
