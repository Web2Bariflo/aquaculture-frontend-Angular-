import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  title='hlo'

 

  fullname={firstname:'',lastname:''}

  constructor(private router: Router,private dataSharingService:DataSharingService) {}

  errorMsg= '';
  

  onMobileNext(){
    if (this.fullname.firstname !== '' && this.fullname.lastname !== ''){
    this.router.navigate(['/register-one']);
    this.dataSharingService.SetFullname(this.fullname)

    }

    else{
      this.errorMsg= '*Please Enter all Fields Data!'
    }
   
  }
}
