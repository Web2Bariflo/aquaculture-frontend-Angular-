
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { DataSharingService } from 'src/app/data-sharing.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    accountid:string="";
    accountname:any;
    newAccount!: FormGroup;
    accountdata:any;
    mobileno : string="";
    accountdetails :any=[];
    errorMsg ="";

  constructor(private formBuilder:FormBuilder,private auth: AuthenticationService, private dataSharingService : DataSharingService, private dialogRef: MatDialogRef<CardComponent>){
  


  }
  showError=false;
   
//   onSubmit(){
//     this.errorMsg= "";
    
//     console.log(this.accountname)
//     if (this.accountname !== undefined){

//       const savedmob = localStorage.getItem('mobno');
      
//       if (savedmob){
//         const getmobno = JSON.parse(savedmob)
//         this.accountdetails = {usermobno: getmobno, accountname: this.accountname}
        
//         this.auth.onSubmitAccountCreate(this.accountdetails).subscribe(response =>

//         {if (response.error === "Account already exists"){
//           this.showError = true;
//         } console.log(response) } ,
//         error => 
//         console.log(error)
//         )
//         console.log(this.showError)
//         if(this.showError === false){
//           this.dialogRef.close();}
        
      
      
//       }

//       else{this.mobileno =this.dataSharingService.getMobile();
//         this.accountdetails = {usermobno: this.mobileno, accountname: this.accountname}
//         this.auth.onSubmitAccountCreate(this.accountdetails).subscribe(response =>
//           {if (response.error === "Account already exists"){
//             this.showError = true;
//           } } ,
//           error => 
//           console.log(error)
//           )
//           if(this.showError === false){window.location.reload();
//             this.dialogRef.close();}
//           }
      
      
      
//     }
//     else{
//       if (this.showError){
//         this.errorMsg = "*Account already Exists! Choose another Name"
//       }
//       else{
//         this.errorMsg = "*Please Enter the value"
//       }
      
//     }

    
// }

async onSubmit() {
  this.errorMsg = "";
  console.log(this.accountname);
  this.showError = false;
  if (this.accountname !== undefined) {
    try {
      const savedmob = localStorage.getItem('mobno');
      let getmobno;

      if (savedmob) {
        getmobno = JSON.parse(savedmob);
      } else {
        this.mobileno = this.dataSharingService.getMobile();
        getmobno = this.mobileno;
      }

      this.accountdetails = { usermobno: getmobno, accountname: this.accountname };
      const response = await this.auth.onSubmitAccountCreate(this.accountdetails).toPromise();

      if (response.error === "Account already exists") {
        this.showError = true;
      }

      console.log(response);

      if (!this.showError) {
        window.location.reload()
        this.dialogRef.close();
      }
    } catch (error) {
      console.log(error);
    }
  } else {

      this.errorMsg = "*Please Enter the value";
    
  }
  if (this.showError) {
    this.errorMsg = "*Account already Exists! Choose another Name";
  }
}



ngOnInit(): void {
    
}
onClose(){
  this.dialogRef.close()
}



}