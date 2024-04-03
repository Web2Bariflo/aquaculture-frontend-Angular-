import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
   //options = ["Account Manager", "Account Admin", "Account User"]
   userData = {mobileno: "",firstname:"", lastname:"", email:"", usertype:"", password:''}
   errorMsg :string = ""
 
   constructor(private auth:AuthenticationService, private dialogRef: MatDialogRef<CreateAdminComponent>, private router: Router){
 
   }
 
   onClickSubmitNewUser(){
     this.errorMsg = ""
 
     if (this.userData.mobileno !== "" && this.userData.firstname !== "" && this.userData.lastname !== "" && this.userData.email !== "" && this.userData.usertype !== "" && this.userData.password !== ""){
       this.auth.onSubmitAddUser(this.userData).subscribe(response =>
         console.log(response),
         error => 
         console.log(error)
         )
         window.location.reload();
         this.dialogRef.close();
       
     }
     else{
       this.errorMsg = "* Please Enter all Fields Data"
     }
 
   }
   onClose(){
     this.dialogRef.close()
   }
}
