import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-new-device',
  templateUrl: './admin-new-device.component.html',
  styleUrls: ['./admin-new-device.component.css']
})
export class AdminNewDeviceComponent implements OnInit{
  events: string[] = [];
  opened: boolean = true;
  shouldRun: boolean = true;
  accountId: string[] = [];
  accountName: string[] = [];
  admin:string[] = [];
 

  constructor(public dialog: MatDialog, private router: Router) {
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




  onLogout1():void{
    this.router.navigate(['/login'])


  }

  onLogout():void{
    this.router.navigate(['/login'])


  }
  userStoreData:any;
  userNameProfile:any;
  
   ngOnInit(): void {
       
  this.userStoreData=localStorage.getItem('userData')
  const userDataObject = JSON.parse(this.userStoreData);
  this.userNameProfile=userDataObject.userName
 }

    
    
  }
