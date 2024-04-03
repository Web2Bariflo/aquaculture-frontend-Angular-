import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DataSharingService } from '../data-sharing.service';
import { AdminDeleteComponent } from '../admin-delete/admin-delete.component';



@Component({
  selector: 'app-super-dashboard',
  templateUrl: './super-dashboard.component.html',
  styleUrls: ['./super-dashboard.component.css']
})
export class SuperDashboardComponent implements OnInit {
  opened: boolean = true;
  constructor(private router:Router, private auth:AuthenticationService, private dialog: MatDialog , private dataSharingService:DataSharingService){
     
    this.auth.getData().subscribe((response)=>{this.userData = response
      console.log(this.userData)
      // this.filteredData = this.userData.datas.filter((item:any) => item[2] === 'admin');
      // console.log(this.filteredData)
      this.totalAdmins  = this.userData.datas.length
      }
      ,
    
      error =>
        console.log(error)
      )

      this.auth.onTotalUsers().subscribe((response:any)=>
        {console.log(response)
        this.totalUsers = response},
        (error:any) =>
        console.log(error))



  }

  onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'


  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'


  }
  
  
  onDeleteUser(mobileno:any):void{

    const dialogRef = this.dialog.open(AdminDeleteComponent,{
        width:'300px',
        data: mobileno
      })
      dialogRef.afterClosed().subscribe(result=>{
        console.log("dialog is closed")
      })
   
        
     }
  totalAdmins:any;
  mobileno:any;
  password:any;
  totalUsers:any;
  
   openDialog3(data:any): void {
      // const dialogRef = this.dialog.open(EditUserComponent, {
      //   width: '700px',
      //   data:data
      // });
  
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed')
        
      // });

      this.mobileno = data[2];
      this.password =  data[4];
    
    
    this.auth.login(this.mobileno, this.password)
    .subscribe(response => {
      console.log(response)
      // Handle successful login and navigation
      if (response.message === "Login Successfull For 3D Admin" || response.message === "Login Successfull For waterbody Admin" || response.message === "Login Successfull For aqua Admin"){
        localStorage.setItem('logMob',JSON.stringify(response.mobno))
        this.dataSharingService.loginSetMob(response.mobno)
        console.log(response);
        this.router.navigate(['./users-check'])

        const userName = response.username
        const UserDataSet = {userName}
        localStorage.setItem('userData',JSON.stringify(UserDataSet))

      }})
    
      
    }

  userData:any =[]
userStoreData:any;
userNameProfile:any;
filteredData:any;
filterText: string = '';



  ngOnInit(): void {
    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
     
    
    this.auth.getData().subscribe((response)=>{this.userData = response
      console.log(this.userData)
      // this.filteredData = this.userData.datas.filter((item:any) => item[2] === 'admin');
      // console.log(this.filteredData)
      this.filteredData  = this.userData.datas
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
  

  filterData() {
    this.filteredData = this.userData.datas.filter((item: any) => {
      // Check if the item is an admin and matches the filter text
      // const isAdmin = item[2] === 'admin';
      const matchesName = item[0].toLowerCase().includes(this.filterText.toLowerCase());
      return matchesName;
    });
  
    // Recalculate the total number of pages
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
  
    // Reset the current page to 1 when filtering
    this.currentPage = 1;
  }
  
}
