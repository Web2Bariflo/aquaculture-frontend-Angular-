import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent {
  //options = ["Account Manager", "Account Admin", "Account User"]
  userData = {mobileno: "",firstname:"", lastname:"", email:"", usertype:"", password:''}
  errorMsg :string = ""

  constructor(private auth:AuthenticationService, private dialogRef: MatDialogRef<AddNewUserComponent>, private router: Router){

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
