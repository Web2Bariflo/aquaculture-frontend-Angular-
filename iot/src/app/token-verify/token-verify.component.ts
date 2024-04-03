import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
@Component({
  selector: 'app-token-verify',
  templateUrl: './token-verify.component.html',
  styleUrls: ['./token-verify.component.css']
})
export class TokenVerifyComponent implements OnInit {
token:any;
  constructor(private route:ActivatedRoute, private auth:AuthenticationService, private router:Router, private dataSharingService:DataSharingService){}


  ngOnInit(){
    this.route.queryParams.subscribe((params: Params) => {


      // Access individual query parameters

      console.log('Query Parameter Value:', params);
 
      // Alternatively, you can access all query parameters as an object
      // console.log('All Query Parameters:', params);
 
      // Send the token to the backend API
      const {category} = params;


      this.auth.tokenCheck(params).subscribe((response)=>{
        console.log(response);

        if(response.message === 'Authenticated successfully.'){

          if (category === 'aquaAdmin'){
            localStorage.setItem('logMob',JSON.stringify(response.mobile_no))
            localStorage.setItem('token',params['token'])
            this.dataSharingService.loginSetMob(response.mobile_no)
            console.log(response);
            this.router.navigate(['./users-check'])
    
            const userName = response.username
            const UserDataSet = {userName}
            localStorage.setItem('userData',JSON.stringify(UserDataSet))
          }
          else{
            localStorage.setItem('token',params['token'])
            localStorage.setItem('logMob',JSON.stringify(response.mobile_no))
            this.router.navigate(['./water-page'])
            this.dataSharingService.setData(response.mobile_no)
            const userName=response.username
            const UserDataSet={mobileno:response.mobno,userName}
            localStorage.setItem('userData',JSON.stringify(UserDataSet))
          }
         
  
        }

       

      }, (error)=>{
        console.log(error)
      })

    });
}

}

 
 
