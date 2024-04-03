import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.css']
})
export class AdminDeleteComponent {



  deletedataUser:any;
  constructor(@Inject(MAT_DIALOG_DATA)  public data:any,private auth:AuthenticationService,private dialogRef:MatDialogRef<AdminDeleteComponent>) { 
      console.log(data)
      this.deletedataUser=data
  }


 async confirmUserDelete(){
    console.log('in',this.deletedataUser)

    try {
      const response = await this.auth.DeleteAdmin(this.deletedataUser).toPromise();
      console.log(response);
   
    } catch (error) {
      console.log(error);
    }
    window.location.reload()
    this.dialogRef.close();
  
  }

  closeUserDelete(){
    this.dialogRef.close();
  }
  

}