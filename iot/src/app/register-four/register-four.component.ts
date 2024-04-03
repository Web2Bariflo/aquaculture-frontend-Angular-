import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-register-four',
  templateUrl: './register-four.component.html',
  styleUrls: ['./register-four.component.css']
})
export class RegisterFourComponent {
  totaldataUser:any;

 

  constructor(private router: Router,private dataSharingService:DataSharingService,) {

    this.totaldataUser=dataSharingService.getemailData()

    console.log(this.totaldataUser)

  }

 

  // UseracceptComponent

  onMobileNext(){

    this.router.navigate(['/login']);

  }
}
