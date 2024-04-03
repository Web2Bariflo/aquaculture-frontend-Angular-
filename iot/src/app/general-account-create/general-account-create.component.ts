
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { DataSharingService } from 'src/app/data-sharing.service';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-general-account-create',
  templateUrl: './general-account-create.component.html',
  styleUrls: ['./general-account-create.component.css']
})


export class GeneralAccountCreateComponent {
  accountid:string="";
    accountname:any;
    newAccount!: FormGroup;
    accountdata:any;
    mobileno : string="";
    accountdetails :any=[];
    errorMsg ="";

  constructor(private formBuilder:FormBuilder,private auth: AuthenticationService, private dataSharingService : DataSharingService, private dialogRef: MatDialogRef<GeneralAccountCreateComponent>){
  


  }
   showError=false;
  async  onSubmit(){
    this.errorMsg = "";
  console.log(this.accountname);
  this.showError = false;
    if (this.accountname !== undefined){
      try{const savedmob = localStorage.getItem('logMob');
      
      if (savedmob){
        const getmobno = JSON.parse(savedmob)
        this.accountdetails = {usermobno: getmobno, accountname: this.accountname}
        const response = await this.auth.onSubmitAccountCreate(this.accountdetails).toPromise();


        if (response.error === "Account already exists") {
          this.showError = true;
        }
  
        console.log(response);
  
        if (!this.showError) {
          window.location.reload()
          this.dialogRef.close();
        }
      
      
      }

      else{this.mobileno =this.dataSharingService.loginGetMob();
        this.accountdetails = {usermobno: this.mobileno, accountname: this.accountname}
        this.auth.onSubmitAccountCreate(this.accountdetails).subscribe(response =>
          console.log(response),
          error => 
          console.log(error)
          )
          window.location.reload()
          this.dialogRef.close();}


      }catch (error) {
        console.log(error);
      }
      
      
      
    }
    else{
      this.errorMsg = "*Please Enter the value"
    }
    if (this.showError) {
      this.errorMsg = "*Account already Exists! Choose another Name";
    }

}

onClose(){
  this.dialogRef.close()
}




}