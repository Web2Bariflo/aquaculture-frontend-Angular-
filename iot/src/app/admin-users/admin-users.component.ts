import { Component, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Dialog } from '@angular/cdk/dialog';
import { AuthenticationService } from '../authentication.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { DataSharingService } from '../data-sharing.service';
import { NoviewDeleteComponent } from '../noview-delete/noview-delete.component';
import { NoviewPermissionComponent } from '../noview-permission/noview-permission.component';
import { NoviewAccountComponent } from '../noview-account/noview-account.component';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
 // Your data array
 pageSize: number = 10; // Number of items per page
 currentPage: number = 1; // Current page
 totalPages: number = 1; // Total number of pages


  constructor(public dialog: MatDialog, private router: Router, private auth: AuthenticationService, private dataSharingService: DataSharingService) {
    // this.loginform-this.formBuilder.group
  }


  openDialog2(): void {
    
    const dialogRef = this.dialog.open(AddNewUserComponent, {
      width: '700px',
      
    });

    //  dialogRef.afterClosed().subscribe(result => {
    //    console.log('The dialog was closed')
      
    // });

    
   
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
      height: '100px',
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

  onPermissions(mobino:any,usertype:any):void{
    if (usertype === "admin"){
      const dialogRef = this.dialog.open(NoviewPermissionComponent,{
        width:'300px',
        height: '100px',
      })
    
      dialogRef.afterClosed().subscribe(result=>{
        console.log("dialog is closed")
      })
     }
     else{
      this.router.navigate(['./user-permissions']);
    this.dataSharingService.setmob(mobino);
     }
    
  }

 onAccounts(mob:any,usertype:any):void{
  if (usertype === "admin"){
    const dialogRef = this.dialog.open(NoviewAccountComponent,{
      width:'300px',
      height: '100px',
    })
  
    dialogRef.afterClosed().subscribe(result=>{
      console.log("dialog is closed")
    })
   }
   else{
     
  this.router.navigate(['./user-accounts'])
  this.dataSharingService.setData(mob);
  localStorage.setItem('mobno',JSON.stringify(mob))
   }
 
  
 }

userData:any =[]
userStoreData:any;
userNameProfile:any;



 ngOnInit(): void {
 
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName
 


  this.auth.getData().subscribe((response)=>{this.userData = response
  console.log(this.userData)
  this.totalPages = Math.ceil(this.userData.items.length / this.pageSize)
  console.log(this.totalPages) }
  ,

  error =>
    console.log(error)
  )
  
    
 
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

getCurrentPageData(): any {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  if (this.userData.items!== undefined){
    return this.userData.items.slice(startIndex, endIndex);
  }

}




onclickHome(){
  this.router.navigate(['./admin-users'])
}

}
