import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminCreateNewDeviceComponent } from '../admin-create-new-device/admin-create-new-device.component';
import { DeviceEditComponent } from '../device-edit/device-edit.component';
import { AuthenticationService } from '../authentication.service';
import { DeleteDeviceTypeComponent } from '../delete-device-type/delete-device-type.component';
import { DataSharingService } from '../data-sharing.service';



@Component({
  selector: 'app-admin-device-types',
  templateUrl: './admin-device-types.component.html',
  styleUrls: ['./admin-device-types.component.css']
})
export class AdminDeviceTypesComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  shouldRun: boolean = true;
  accountId: string[] = [];
  accountName: string[] = [];
  admin:string[] = [];
  deviceCount:any;

  constructor(private router: Router, public dialog : MatDialog, private auth: AuthenticationService, private dataSharingService: DataSharingService ) {
    // this.loginform-this.formBuilder.group
  }



  // ():void{
  //   this.http.post("http://127.0.0.1:8000/admin",DialogData)
  // }

  
  
  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }




  onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  

  onAddDeviceType(): void {
    const dialogRef = this.dialog.open(AdminCreateNewDeviceComponent, {
      width: '400px',
      
    });

    dialogRef.afterClosed().subscribe(result => {      
    });
    
}

onEditDevice(devices:any):void{
  const dialogRef = this.dialog.open(DeviceEditComponent, {
    width: '400px',
    data: devices
  });

  dialogRef.afterClosed().subscribe(result => {      
  });
}


onAssignedCntrls(device:any){
  this.router.navigate(['./device-assign-controls'])
  const deviceType = {type_name: device[0],type_ver: device[1]}
  this.dataSharingService.setDeviceType(deviceType);
  localStorage.setItem('localDevice', JSON.stringify(deviceType))
}

devicedetails:any=[];

userStoreData:any;
userNameProfile:any;
pageSize: number = 10; // Number of items per page
currentPage: number = 1; // Current page
totalPages: number = 1; // Total number of pages


 ngOnInit(): void {
   
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName
    this.auth.onGetDeviceTypes().subscribe(response=>
    {console.log(response),
    this.devicedetails = response 
    this.deviceCount = this.devicedetails.results.length
    this.totalPages = Math.ceil(this.devicedetails.results.length / this.pageSize);},
    error=>
    console.log(error) )
}


onDeleteDevice(device:any){
  const dialogRef = this.dialog.open(DeleteDeviceTypeComponent, {
    width: '400px',
    data: device
  });

  dialogRef.afterClosed().subscribe(result => {      
  });
}
setPage(pageNumber: number) {
  if (pageNumber >= 1 && pageNumber <= this.totalPages) {
    this.currentPage = pageNumber;
  }
}

// Function to go to the next page
nextPage() {
  this.setPage(this.currentPage + 1);
}

// Function to go to the previous page
prevPage() {
  this.setPage(this.currentPage - 1);
}
getCurrentPageData(): any{
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  if (this.devicedetails.results!== undefined){
  return this.devicedetails.results.slice(startIndex, endIndex);

  }
}


}