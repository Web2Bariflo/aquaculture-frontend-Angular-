import { Component,OnInit } from '@angular/core';
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
import { CreateAdminComponent } from '../create-admin/create-admin.component';


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent{

  events: string[] = [];
  opened: boolean = true;
 // Your data array
 pageSize: number = 10; // Number of items per page
 currentPage: number = 1; // Current page
 totalPages: number = 1; // Total number of pages
 userData: {
  mobno: string;
  firstname: string;
  lastname: string;
  email: string;
  // usertype: string;
  password: string;
  usertype: string;
  userimg: any; // Set the correct type
} = {
  mobno: "",
  firstname: "",
  lastname: "",
  email: "",
  // usertype: "admin",
  password: '',
  usertype: '',
  userimg: null,
};
 errorMsg :string = ""

 combinedFormData = new FormData();
  constructor(public dialog: MatDialog, private router: Router, private auth: AuthenticationService, private dataSharingService: DataSharingService) {
    // this.loginform-this.formBuilder.group
  }
  selectedImage: string | ArrayBuffer | null = './assets/img/profile-pic.png';

 
  iconUrl:any;
  onFileSelectedProfile(event: any) {

    const file = event.target.files[0];

    console.log(file)

    
     this.iconUrl = URL.createObjectURL(file);
     console.log(this.iconUrl)
    if (file) {

      const reader = new FileReader();

 

      reader.onload = (e: any) => {

        this.selectedImage = e.target.result;

 

      };

 

      reader.readAsDataURL(file);

    }

  }

  uploadImage(event: Event) {
    event.preventDefault();
    
    if (this.selectedImage) {
      let imageBlob: Blob | null = null;
      
      if (this.selectedImage instanceof ArrayBuffer) {
        // If it's an ArrayBuffer, create a Blob from it
        imageBlob = new Blob([this.selectedImage]);
      } else if (typeof this.selectedImage === 'string') {
        // If it's a string, create a Blob from it
        imageBlob = new Blob([this.selectedImage], { type: 'image/png' }); // Specify the correct MIME type
      }
      if (imageBlob) {
        // Create a FormData and append the image to it
        const formData = new FormData();
        const dynamicFilename = `${this.userData.firstname}_${this.userData.lastname}.png`;
        formData.append('userimg', imageBlob, dynamicFilename);
  
        // Append other userData fields to the FormData
        if (imageBlob) {
          // Append the Blob to the combined FormData
          const dynamicFilename = `${this.userData.firstname}_${this.userData.lastname}.png`;
          this.combinedFormData.append('userimg', imageBlob, dynamicFilename);
    
          // Log the combined FormData and other variables for debugging
          console.log('combined image:', this.combinedFormData.get('userimg'));
        }
  
    }
 
  }
}

  // openDialog2(): void {
    
  //   const dialogRef = this.dialog.open(CreateAdminComponent, {
  //     width: '700px',
      
  //   });

  //    dialogRef.afterClosed().subscribe(result => {
  //      console.log('The dialog was closed')
      
  //   });

    
   
  // }
  
  onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'


  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'


  }
  
  
  // onDeleteUser(mobileno:any):void{

  // const dialogRef = this.dialog.open(UserDeleteComponent,{
  //     width:'300px',
  //     data: mobileno
  //   })
  
  //   dialogRef.afterClosed().subscribe(result=>{
  //     console.log("dialog is closed")
  //   })
   
      
  //  }
   




//  openDialog3(data:any): void {
//     const dialogRef = this.dialog.open(EditUserComponent, {
//       width: '700px',
//       data:data
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed')
      
//     });

    
    
//   }





  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }

//   onPermissions(mobino:any,usertype:any):void{
//     if (usertype === "admin"){
//       const dialogRef = this.dialog.open(NoviewPermissionComponent,{
//         width:'300px',
//         height: '100px',
//       })
    
//       dialogRef.afterClosed().subscribe(result=>{
//         console.log("dialog is closed")
//       })
//      }
//      else{
//       this.router.navigate(['./user-permissions']);
//     this.dataSharingService.setmob(mobino);
//      }
    
//   }

//  onAccounts(mob:any,usertype:any):void{
//   if (usertype === "admin"){
//     const dialogRef = this.dialog.open(NoviewAccountComponent,{
//       width:'300px',
//       height: '100px',
//     })
  
//     dialogRef.afterClosed().subscribe(result=>{
//       console.log("dialog is closed")
//     })
//    }
//    else{
     
//   this.router.navigate(['./user-accounts'])
//   this.dataSharingService.setData(mob);
//   localStorage.setItem('mobno',JSON.stringify(mob))
//    }
 
  
//  }

userDataDetails:any =[]
userStoreData:any;
userNameProfile:any;

selectedItem: string | null = null; // Initialize as null because no item is selected initially

selectItem(itemName: string) {
  this.selectedItem = itemName;
}

 ngOnInit(): void {
 
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName
 


  // this.auth.getData().subscribe((response)=>{this.userDataDetails = response
  // console.log(this.userDataDetails)
  // this.totalPages = Math.ceil(this.userDataDetails.items.length / this.pageSize)
  // console.log(this.totalPages) }
  // ,

  // error =>
  //   console.log(error)
  // )
  
    
 
 }

//  setPage(pageNumber: number) {
//   if (pageNumber >= 1 && pageNumber <= this.totalPages) {
//     this.currentPage = pageNumber;
//   }
// }

// // Function to go to the next page
// nextPage() {
//   this.setPage(this.currentPage + 1);
// }

// // Function to go to the previous page
// prevPage() {
//   this.setPage(this.currentPage - 1);
// }

// getCurrentPageData(): any {
//   const startIndex = (this.currentPage - 1) * this.pageSize;
//   const endIndex = startIndex + this.pageSize;
//   if (this.userDataDetails.items!== undefined){
//     return this.userDataDetails.items.slice(startIndex, endIndex)
//   }

// }



async onCreateAdmin(){
  this.errorMsg = ""


  this.combinedFormData.append('mobno', this.userData.mobno);
  this.combinedFormData.append('firstname', this.userData.firstname);
  this.combinedFormData.append('lastname', this.userData.lastname);
  this.combinedFormData.append('email', this.userData.email);
  this.combinedFormData.append('password', this.userData.password);
  this.combinedFormData.append('usertype', this.userData.usertype);

  // Log the combined FormData for debugging
  console.log('combined FormData:', this.combinedFormData.getAll('usertype'));
 
  if (this.userData.mobno !== "" && this.userData.firstname !== "" && this.userData.lastname !== "" && this.userData.email !== ""  && this.userData.password !== ""&& this.userData.usertype!=='' && this.selectedImage!=='./assets/img/profile-pic.png' ){
    await this.auth.onSuperAdminCreate(this.combinedFormData).subscribe(response =>
      {console.log(response);
      if (response.message === 'Admin User created'){
        const dialogRef = this.dialog.open(NoviewAccountComponent, {
          width: '500px',

        })
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['./super-dashboard'])
        });
      }}
      ,
      error => 
      console.log(error)
      )

      // onSubmitAddUser
    
  }
  else{
    this.errorMsg = "* Please Enter all Fields Data"
  }


  

}



}





















