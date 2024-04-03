
import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-general-account-delete',
  templateUrl: './general-account-delete.component.html',
  styleUrls: ['./general-account-delete.component.css']
})
export class GeneralAccountDeleteComponent {
  deleteAccount:any;
  constructor(@Inject(MAT_DIALOG_DATA)  public data:any,private auth:AuthenticationService,private dialogRef:MatDialogRef<GeneralAccountDeleteComponent>) { 
      console.log(data)
      this.deleteAccount=data
  }


  confirmAccountDelete(){
    console.log(this.deleteAccount)
    this.auth.DeleteAccount(this.deleteAccount).subscribe(

      (res)=>
      {console.log(res)
      },
      err=>console.log(err)
    )
    window.location.reload()
    this.dialogRef.close();
  }

  closeAccountDelete(){
    this.dialogRef.close();
  }
}


  



