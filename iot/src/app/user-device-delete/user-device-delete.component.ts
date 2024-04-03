import { Component, Inject} from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-device-delete',
  templateUrl: './user-device-delete.component.html',
  styleUrls: ['./user-device-delete.component.css']
})
export class UserDeviceDeleteComponent {
  
  deletedevice:any;
  constructor(@Inject(MAT_DIALOG_DATA)  public data:any,private auth:AuthenticationService,private dialogRef:MatDialogRef<UserDeviceDeleteComponent>) { 
      console.log(data)
      this.deletedevice=data
  }


  confirmDeviceDelete(){
    console.log(this.deletedevice)
    this.auth.onDeviceDelete(this.deletedevice).subscribe(

      (res)=>
      {console.log(res)
      },
      err=>console.log(err)
    )
    window.location.reload()
    this.dialogRef.close();
  }

  closeDeviceDelete(){
    this.dialogRef.close();
  }
  


}

