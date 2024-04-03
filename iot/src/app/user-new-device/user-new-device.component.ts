import { Component,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-user-new-device',
  templateUrl: './user-new-device.component.html',
  styleUrls: ['./user-new-device.component.css']
})
export class UserNewDeviceComponent implements OnInit{
  events: string[] = [];
  opened: boolean = false;
  selectdevice : string="";
  devicename: string="";

  constructor(public dialog: MatDialog, private router: Router, private auth: AuthenticationService, private dataSharingService: DataSharingService, private dialogRef: MatDialogRef<UserNewDeviceComponent>) {
    // this.loginform-this.formBuilder.group
  }

  
//   onLogout():void{
//     this.router.navigate(['/login'])


//   }
//   onLogout1():void{
//     this.router.navigate(['/login'])


//   }

//   OnAction():void{
//     this.router.navigate(['./user-account-devices'])
//   }
  
  




    
    
  
//   subMenuStates: { [key: string]: boolean } = {};

//   toggleSubMenu(subMenuKey: string): void {
//     this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
//   }

//   isSubMenuOpen(subMenuKey: string): boolean {
//     return this.subMenuStates[subMenuKey] || false;
//   }

//   onPermissions():void{
//     this.router.navigate(['./user-permissions']);
//   }

//  onAccounts():void{
//   this.router.navigate(['./user-accounts'])
//  }

//  onClick():void{
//   this.router.navigate(['./user-account-devices']);
// }
errorMsg ="";
showError=false;

async onAddDevice(){
  this.errorMsg =""
  this.showError=false;
  if (this.devicename !== "" && this.selectdevice !== ""){
    try{const savedaccountid = localStorage.getItem('accountId')

    if (savedaccountid){
      const getaccount = JSON.parse(savedaccountid)

      const deviceDetails = {accountid:getaccount, devicename: this.devicename,devicetype: this.selectdevice}
      const response = await this.auth.onAddNewDevice(deviceDetails).toPromise();
      if (response.error === "Device name already exists for this account") {
        this.showError = true;
      }

      console.log(response);

      if (!this.showError) {
        window.location.reload()
        this.dialogRef.close();
      }

    }

    else{
      
    const accountid = this.dataSharingService.getAccountId();
    const deviceDetails = {accountid:accountid, devicename: this.devicename,devicetype: this.selectdevice}
    this.auth.onAddNewDevice(deviceDetails).subscribe(response=>
      console.log(response),
      error=>
      console.log(error))
      this.dialogRef.close();
    }

}
catch (error) {
  console.log(error);
}

    



  }
  else{
    this.errorMsg = "*Please Enter all fields values"
  }
  if (this.showError) {
    this.errorMsg = "*Device already Exists! Choose another Name";
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
onClose(){
  this.dialogRef.close()
}

}
