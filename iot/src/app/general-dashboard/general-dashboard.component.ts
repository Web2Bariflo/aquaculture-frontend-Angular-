import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { EditComponent } from '../dashboard/edit/edit.component';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';  
import { UserAccountDeleteComponent } from '../user-account-delete/user-account-delete.component';


@Component({
  selector: 'app-general-dashboard',
  templateUrl: './general-dashboard.component.html',
  styleUrls: ['./general-dashboard.component.css']
})
export class GeneralDashboardComponent implements OnInit {
  opened= true;

  
  constructor(private auth:AuthenticationService, public dialog: MatDialog, private router: Router,private dataSharingService: DataSharingService) {
    // this.loginform-this.formBuilder.group
  }

  onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'

    localStorage.removeItem('token')
  }
  
 
getCurrentPageData(): any {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  
 if (this.accountsData.items!== undefined){
  return this.accountsData.items.slice(startIndex, endIndex);
}
 
}

 ngOnInit(): void {
     
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName
   
  const savedmob =localStorage.getItem('logMob')
  console.log(savedmob)
  
  if(savedmob){
    const getmob = JSON.parse(savedmob)
    const mobData = {mobileno: getmob}

    this.auth.onGetAccounts(mobData).subscribe(response=>
      {console.log(response), 
      this.accountsData = response
      this.totalPages = Math.ceil(this.accountsData.items.length / this.pageSize)
    }
       
      ,
      error=>console.log(error))
  
  }
  
else{
  this.mobileno = this.dataSharingService.loginGetMob();
    console.log(this.mobileno);

    


    this.dataSharingService.sendMobile(this.mobileno);
    const mobData = {mobileno: this.mobileno}
    this.auth.onGetAccounts(mobData).subscribe(response=>
      {console.log(response), 
      this.accountsData = response
      this.totalPages = Math.ceil(this.accountsData.items.length / this.pageSize)
      }
       
      ,
      error=>console.log(error))
  }
  
}
onClick(accountid:any){
 this.dataSharingService.sendAccountId(accountid);
 this.router.navigate(['./action']);
 localStorage.setItem('accountId', JSON.stringify(accountid))
}
mobileno ="";

accountsData:any=[];
userStoreData:any;
userNameProfile:any;
pageSize: number = 10; // Number of items per page
currentPage: number = 1; // Current page
totalPages: number = 1;
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

   
}
