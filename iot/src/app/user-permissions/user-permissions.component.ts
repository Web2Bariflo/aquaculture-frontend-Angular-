import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';


@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})

export class UserPermissionsComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;

  permission= {usercreate: false,
  useredit: false,
  userdelete: false,
  userview: false,
  accountcreate: false,
  accountedit: false,
  accountdelete: false,
  accountview: false,
  devicecreate: false,
  deviceedit: false,
  deviceview: false,
  devicedelete: false,
  deviceinstruction: false,
  setting: false,
  userid: ''}

  constructor(private router: Router, private auth:AuthenticationService, private dataSharingService:DataSharingService ){}

  onLogout():void{
    this.router.navigate(['/login'])


  }
  onLogout1():void{
    this.router.navigate(['/login'])


  }
  
  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }

  onPermissions():void{
    this.router.navigate(['./user-permissions']);
  }
  



onclickHome(){
  this.router.navigate(['./admin-users'])
}

  onSave(){
    const getmobile = this.dataSharingService.getmob();
    this.permission.userid = getmobile;

    this.auth.onPermissionsCreate(this.permission).subscribe(response=>
      console.log(response),
      error=>
      console.log(error))
      this.router.navigate(['./admin-users']);
    }

    userPermissions:any={}
    permissData:any =[]
    userStoreData:any;
    userNameProfile:any;
    
     ngOnInit(): void {
         
    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
    const getmobile = this.dataSharingService.getmob();
  
      this.auth.onFetchpermissions(getmobile).subscribe(response =>
       { console.log(response),
      this.userPermissions = response,
      this.permissData=this.userPermissions.message,
      
      
      this.permission = {usercreate: this.permissData.user_create,
        useredit: this.permissData.user_edit,
        userdelete: this.permissData.user_delete,
        userview: this.permissData.user_view,
        accountcreate: this.permissData.account_create,
        accountedit: this.permissData.account_edit,
        accountdelete: this.permissData.account_delete,
        accountview: this.permissData.account_view,
        devicecreate: this.permissData.device_create,
        deviceedit: this.permissData.device_edit,
        deviceview: this.permissData.device_view,
        devicedelete: this.permissData.device_delete,
        deviceinstruction: this.permissData.deviceinstruction,
        setting: this.permissData.settings,
        userid: "0"
        },
    console.log(this.permission)},
      error=>
      console.log(error))

      
  }


}
