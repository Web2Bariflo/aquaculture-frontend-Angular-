import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { EditComponent } from '../dashboard/edit/edit.component';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';  
import { UserAccountDeleteComponent } from '../user-account-delete/user-account-delete.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;


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
  
  
  
  // openDialog(): void {
    
  //   const dialogRef = this.dialog.open(CardComponent, {
  //     width: '400px',
      
  //   });
    
   

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed')
      
  //   });
   
  // }
  mobileno ="";

  accountsData:any=[];
  userStoreData:any;
  userNameProfile:any;
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number = 1;

  openDialog1(data:any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data:data
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      
    });

    
    
  }

  onDeleteAccount(accountid:any){
    const dialogRef = this.dialog.open(UserAccountDeleteComponent, {
      width: '400px',
      data:accountid
      
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

  onPermissions():void{
    this.router.navigate(['./user-permissions']);
  }

 onAccounts():void{
  this.router.navigate(['./user-accounts'])
 }

 onClick(accountid:any){
  this.dataSharingService.sendAccountId(accountid);
  this.router.navigate(['./user-account-devices']);
  localStorage.setItem('accountId', JSON.stringify(accountid))
}
 // Total number of pages



getCurrentPageData(): any {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  
 if (this.accountsData.items!== undefined){
  return this.accountsData.items.slice(startIndex, endIndex);
}
 
}


userMobileno:any;
 ngOnInit(): void {
     
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName


this.mobileno = this.dataSharingService.getUserMobNo();
console.log('befor',this.mobileno);




this.userMobileno = localStorage.getItem('userMob');

  const userMob = JSON.parse(this.userMobileno);
  console.log('local',userMob);
  this.auth.onAdminUserAccounts(userMob).subscribe(response=>
    {console.log(response), 
    this.accountsData = response
    this.totalPages = Math.ceil(this.accountsData.items.length / this.pageSize)
    }
     
    ,
    error=>console.log(error))





}
   
  // const savedmob =localStorage.getItem('mobno')
  // console.log(savedmob)
  
//   if(savedmob){
//     const getmob = JSON.parse(savedmob)
//     const mobData = {mobileno: getmob}

//     this.auth.onGetAccounts(mobData).subscribe(response=>
//       {console.log(response), 
//       this.accountsData = response
//       this.totalPages = Math.ceil(this.accountsData.items.length / this.pageSize)
//     }
       
//       ,
//       error=>console.log(error))
  
//   }
  
// else{
//   this.mobileno = this.dataSharingService.getData();
//     console.log(this.mobileno);

    


//     this.dataSharingService.sendMobile(this.mobileno);
//     const mobData = {mobileno: this.mobileno}
//     this.auth.onGetAccounts(mobData).subscribe(response=>
//       {console.log(response), 
//       this.accountsData = response
//       this.totalPages = Math.ceil(this.accountsData.items.length / this.pageSize)
//       }
       
//       ,
//       error=>console.log(error))
//   }
  

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
