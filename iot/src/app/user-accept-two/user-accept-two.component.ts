import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAcceptSuccessComponent } from '../user-accept-success/user-accept-success.component';
import { UserNewDeviceComponent } from '../user-new-device/user-new-device.component';
import { Data } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import { RegisterAddDeviceComponent } from '../register-add-device/register-add-device.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-accept-two',
  templateUrl: './user-accept-two.component.html',
  styleUrls: ['./user-accept-two.component.css']
})
export class UserAcceptTwoComponent {

  constructor(@Inject (MAT_DIALOG_DATA) public data:any,private dialog: MatDialog,private auth:AuthenticationService, private dialogRef:MatDialogRef<UserAcceptTwoComponent>,private dataSharingService:DataSharingService){
  this.registerDetails= this.dataSharingService.getRegisterDetails();
  const jsonInput = this.registerDetails[3].devicesList;
  // const convJson = jsonInput.replace(/'/g,'"');
  // this.deviceDetails = JSON.parse(jsonInput);
  this.deviceDetails = jsonInput;
  console.log(this.deviceDetails)

  }

  registerDetails:any;
  deviceDetails:any;
 async onDevices(){
    const dialogbox = this.dialog.open(UserAcceptSuccessComponent,{
      width:'500px',
    })
    
    await this.auth.onRegisterMail(this.registerDetails[1]).subscribe(response=>
      console.log(response),
      error=>
      console.log(error))
    this.dialogRef.close();
  }


  onAddDevice(){
    console.log('two',this.data)
    
    const dialogRef = this.dialog.open(RegisterAddDeviceComponent, {
      width: 'max-containt',
      data:this.data,
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    });

  }
}
