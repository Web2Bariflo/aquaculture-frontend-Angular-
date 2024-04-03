import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-two',
  templateUrl: './register-two.component.html',
  styleUrls: ['./register-two.component.css']
})
export class RegisterTwoComponent {
  categoryFullData:any;

  MobileAadhaar={  adhaar:'',mobno:'',accountname:''}
 

  constructor(private router: Router,private dataSharingService:DataSharingService) {

    this.categoryFullData=this.dataSharingService.getCategoryData()

    console.log(this.categoryFullData)

  }

 
  errorMsg :any;
 

  onMobileNext(){

    if(this.MobileAadhaar.adhaar !== '' && this.MobileAadhaar.mobno !== '' && this.MobileAadhaar.accountname !== ''){


      this.router.navigate(['/register-three']);

      this.dataSharingService.setAadhaarMobile({...this.categoryFullData,...this.MobileAadhaar})
    }

    else{
      this.errorMsg = '*Please Enter the all Fields Data!'
    }
 

  }

}


