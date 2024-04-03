import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserAcceptOneComponent } from '../user-accept-one/user-accept-one.component';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';
import { baseColors } from 'ng2-charts';
import { UseracceptCreatePondComponent } from '../useraccept-create-pond/useraccept-create-pond.component';


@Component({
  selector: 'app-user-accept',
  templateUrl: './user-accept.component.html',
  styleUrls: ['./user-accept.component.css']
})
export class UserAcceptComponent {

  password:any;

  basicDetails:any;
  constructor(private dialog: MatDialog, private dialogRef:MatDialogRef<UserAcceptComponent>, private auth:AuthenticationService, private dataSharingService:DataSharingService){
    this.basicDetails = dataSharingService.getRegisterDetails();
  }
  errorMsg=''
 async onAccounts(){

  if (this.password!==undefined){
    
  const userDetails = {mobileno:this.basicDetails[1], password:this.password, user_pic:'',user_docs:''}
  await  this.auth.onSendBasicDetails(userDetails).subscribe(response=>{
    console.log(response),
    (error:any)=> console.log(error)
  })

    const dialogbox = this.dialog.open(UseracceptCreatePondComponent,{
      width:'700px',
      height:'800px',
    })
    this.dialogRef.close();

  
  }
  else{
    this.errorMsg ='*Please Enter the password!'
  }

    
  }
}
