import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserAcceptTwoComponent } from '../user-accept-two/user-accept-two.component';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-accept-one',
  templateUrl: './user-accept-one.component.html',
  styleUrls: ['./user-accept-one.component.css']
})
export class UserAcceptOneComponent {

  constructor(private dialog: MatDialog, private dialogRef:MatDialogRef<UserAcceptTwoComponent>, private dataSharingService:DataSharingService, private auth:AuthenticationService){
 
    this.registerDetails =this.dataSharingService.getRegisterDetails();
    this.accountName = this.registerDetails[3].accountname;
  }

 

  
  accountId:any;
  registerDetails:any; 
  accountName:any; 

 async onAccounts(){

    const accountDetails={accountname:this.registerDetails[3].accountname,usermobno:this.registerDetails[1]}
    await this.auth.onSendAccountDetails(accountDetails).subscribe(response=>
     { console.log(response)
        this.accountId = response.accountid;
        const dialogbox = this.dialog.open(UserAcceptTwoComponent,{
          width:'500px',
          data: this.accountId,
        })
      
      },
      (error)=>
      console.log(error))
      
    
    this.dialogRef.close();

  }
}
