import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { DialogRef } from '@angular/cdk/dialog';
import { CardComponent } from '../dashboard/card/card/card.component';
import { UserAccountCreateComponent } from '../user-account-create/user-account-create.component';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-general-user-create',
  templateUrl: './general-user-create.component.html',
  styleUrls: ['./general-user-create.component.css']
})
export class GeneralUserCreateComponent {
  opened: boolean = true;
  constructor(private router:Router, private auth:AuthenticationService, private dialog: MatDialog, private dataSharingService:DataSharingService ){

  }
  userData:any =[]
userStoreData:any;
userNameProfile:any;
filteredData:any;
filterText: string = '';
usersAccepted:any;
mobno:any;
onLogout():void{
  window.location.href = 'http://aqua.bariflorobotics.com/login'
  localStorage.removeItem('token')

}
onLogout1():void{
  window.location.href = 'http://aqua.bariflorobotics.com/login'
  localStorage.removeItem('token')

}


  ngOnInit(): void {
    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
     
    const adminMob =localStorage.getItem('logMob');
    this.auth.onCreatedUserView(adminMob).subscribe((response)=>{this.userData = response
      this.usersAccepted = this.userData.items.length
      console.log(this.userData)
      this.filteredData = this.userData.items
      this.totalPages = Math.ceil(this.filteredData.length / this.pageSize)
      console.log(this.totalPages) }
      ,
    
      error =>
        console.log(error)
      )
    
      
  }
  
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number = 1; // Total number of pages
 

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
    if (this.filteredData !== undefined) {
      return this.filteredData.slice(startIndex, endIndex);
    }
  }


  onAccountCreate(mobileno:any){

    const dialogRef = this.dialog.open(UserAccountCreateComponent, {
      width: "400px",
      data: mobileno,
    })
  }

  onDeleteUser(mobileno:any){
    const dialogRef = this.dialog.open(UserDeleteComponent,{
      width:'300px',
      data: mobileno,
    })
  
  }
  onUserView(mobileno:any){
    this.dataSharingService.sendUserMobNo(mobileno)
    localStorage.setItem('userMob',JSON.stringify(mobileno))
    this.router.navigate(['./user-accounts'])
  }
}

