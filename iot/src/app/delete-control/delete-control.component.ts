import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-control',
  templateUrl: './delete-control.component.html',
  styleUrls: ['./delete-control.component.css']
})
export class DeleteControlComponent {

  
  constructor(@Inject(MAT_DIALOG_DATA)  public data:any,private auth:AuthenticationService,private dialogRef:MatDialogRef<DeleteControlComponent>) { 


  }
  virtualpin:any;

 async confirmUserDelete(){

    if (this.data.control_key === 'button' || this.data.control_key === 'slider' ){
      this.virtualpin = this.data.data.virtual_pin;
    }
    else{
      this.virtualpin = this.data.data.params;
    }

    const deleteControls = {type_name: this.data.deviceDetails.type_name, type_ver: this.data.deviceDetails.type_ver, display_name:this.data.data.display_name,virtual_pin:this.virtualpin}

   await this.auth.onDeleteControl(deleteControls).subscribe(

      (res)=>
      {console.log(res)

        if (res.message === 'Removed'){
          window.location.reload();

    this.dialogRef.close();

        }

      },
      err=>console.log(err)
    )
    
  }

  closeUserDelete(){
    this.dialogRef.close();
  }
}
