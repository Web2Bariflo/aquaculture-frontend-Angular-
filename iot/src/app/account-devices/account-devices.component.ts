import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-devices',
  templateUrl: './account-devices.component.html',
  styleUrls: ['./account-devices.component.css']
})
export class AccountDevicesComponent {
  events: string[] = [];
  opened: boolean = false;
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

  
  OnAction():void{
    this.router.navigate(['./action'])
  }
  onLogout():void{
    this.router.navigate(['/login'])

  }
  onLogout1():void{
    this.router.navigate(['/login'])

  }

}
