
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-general-new-device',
  templateUrl: './general-new-device.component.html',
  styleUrls: ['./general-new-device.component.css']
})
export class GeneralNewDeviceComponent implements OnInit{
  events: string[] = [];
  opened: boolean = false;
  selectdevice : string="";
  devicename: string="";

  constructor(public dialog: MatDialog, private router: Router, private auth: AuthenticationService, private dataSharingService: DataSharingService, private dialogRef: MatDialogRef<GeneralNewDeviceComponent>) {
    // this.loginform-this.formBuilder.group
  }

  errorMsg ="";

onAddDevice(){
  this.errorMsg =""
  if (this.devicename !== "" && this.selectdevice !== ""){

    const savedaccountid = localStorage.getItem('logaccountId')

    if (savedaccountid){
      const getaccount = JSON.parse(savedaccountid)

      const deviceDetails = {accountid:getaccount, devicename: this.devicename,devicetype: this.selectdevice}
  this.auth.onAddNewDevice(deviceDetails).subscribe(response=>
    console.log(response),
    error=>
    console.log(error))
    window.location.reload()
    this.dialogRef.close();

    }

    else{
      
    const accountid = this.dataSharingService.getLoginAccountId();
    const deviceDetails = {accountid:accountid, devicename: this.devicename,devicetype: this.selectdevice}
    this.auth.onAddNewDevice(deviceDetails).subscribe(response=>
      console.log(response),
      error=>
      console.log(error))
      window.location.reload()
      this.dialogRef.close();
    }





  }
  else{
    this.errorMsg = "*Please Enter all fields values"
  }
  
}


devicedetails: any=[];

ngOnInit(): void {
  this.auth.onGetDeviceTypes().subscribe(response=>
    {console.log(response),
    this.devicedetails = response},
    error=>
    console.log(error) )
}


}



