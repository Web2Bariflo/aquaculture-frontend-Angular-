import { Component, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Dialog } from '@angular/cdk/dialog';
import { AuthenticationService } from '../authentication.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { DataSharingService } from '../data-sharing.service';
import { NoviewAccountComponent } from '../noview-account/noview-account.component';
import { NoviewDeleteComponent } from '../noview-delete/noview-delete.component';


@Component({
  selector: 'app-general-users',
  templateUrl: './general-users.component.html',
  styleUrls: ['./general-users.component.css']
})


  export class GeneralUsersComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number = 1; // Total number of pages

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
  constructor(public dialog: MatDialog, private router: Router, private auth: AuthenticationService, private dataSharingService: DataSharingService) {
    // this.loginform-this.formBuilder.group
  }

  openDialog2(): void {
    
    const dialogRef = this.dialog.open(AddNewUserComponent, {
      width: '700px',
      
    });

     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed')
      
    });
   
  }
  
  onLogout():void{
    this.router.navigate(['/login'])


  }
  onLogout1():void{
    this.router.navigate(['/login'])


  }
  
  onDeleteUser(mobileno:any, usertype:any):void{
    if (usertype === "admin"){
      const dialogRef = this.dialog.open(NoviewDeleteComponent,{
        width:'300px',
        height:'100px',
      })
    
      dialogRef.afterClosed().subscribe(result=>{
        console.log("dialog is closed")
      })
    }
    else{
      const dialogRef = this.dialog.open(UserDeleteComponent,{
        width:'300px',
        data: mobileno
      })
    
      dialogRef.afterClosed().subscribe(result=>{
        console.log("dialog is closed")
      })
    }
      
   }



 openDialog3(data:any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '700px',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      
    });

    
    
  }

  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }

  onPermissions(mobino:any):void{
    this.router.navigate(['./user-permissions']);
    this.dataSharingService.setmob(mobino);
  }

 onAccounts(mob:any):void{
  this.router.navigate(['./user-accounts'])
  this.dataSharingService.setData(mob);
  localStorage.setItem('mobno',JSON.stringify(mob))
  
 }

userData:any =[]
userPermissions:any={}
permissData:any =[]

userStoreData:any;
userNameProfile:any;

 ngOnInit(): void {
     
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName




  // const savedlogmob = localStorage.getItem('logMob');

  if (this.userStoreData){
    // const getlogmob = JSON.parse(this.userStoreData);
    const userDataObject = JSON.parse(this.userStoreData);

    const receivedData=userDataObject.mobileno

    console.log(this.permission.userview)

    

      this.auth.onFetchpermissions(receivedData).subscribe(response =>
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
     console.log(this.permission);
       
     if (this.permission.userview === true){
      
  this.auth.getData().subscribe((response)=>{this.userData = response
    console.log(this.userData) 
    this.totalPages = Math.ceil(this.userData.items.length / this.pageSize);}
    ,
  
    error =>
      console.log(error)
    )
    }
},
       error=>
       console.log(error))


    

  }

  else{
    const logmob = this.dataSharingService.loginGetMob();

    
    this.auth.onFetchpermissions(logmob).subscribe(response =>
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
   console.log(this.permission);
   if (this.permission.userview === true){
    this.auth.getData().subscribe((response)=>{this.userData = response
      console.log(this.userData)
      this.totalPages = Math.ceil(this.userData.items.length / this.pageSize); }
      ,
    
      error =>
        console.log(error)
      )}
  },
     error=>
     console.log(error))


    
    

   


  }


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
    getCurrentPageData(){
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      if (this.userData.items !== undefined){
      return this.userData.items.slice(startIndex, endIndex);

      }
    }

}

     
 
