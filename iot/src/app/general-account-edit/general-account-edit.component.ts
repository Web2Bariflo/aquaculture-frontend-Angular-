
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-general-account-edit',
  templateUrl: './general-account-edit.component.html',
  styleUrls: ['./general-account-edit.component.css']
})
export class GeneralAccountEditComponent {
  errorMsg= "";

  editaccountname: string="";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth:AuthenticationService, private dialogRef: MatDialogRef<GeneralAccountEditComponent>) {}

  onDetailsUpdate(editAccount:any){

    this.errorMsg="";

    if (this.data[0] !== ""){

      this.auth.onEditAccounts(editAccount).subscribe(response=>
        console.log(response),
        error=>
        console.log(error))
        window.location.reload()
        this.dialogRef.close()
    }
    else{
      this.errorMsg ="*Please Enter the value"
    }

    

}
onClose(){
  this.dialogRef.close()
}

}



