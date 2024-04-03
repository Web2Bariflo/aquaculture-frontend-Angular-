import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-device-type',
  templateUrl: './delete-device-type.component.html',
  styleUrls: ['./delete-device-type.component.css']
})
export class DeleteDeviceTypeComponent {


  addDeleteData:any;

  DeviceTypeStore:any;
  constructor(@Inject(MAT_DIALOG_DATA)  public data:any,private auth:AuthenticationService,private dialogRef:MatDialogRef<DeleteDeviceTypeComponent>) { 
    
    this.addDeleteData={devicetypename:data[0],devicetypeversion:data[1]}
    // console.log(this.addDeleteData)
    
  }

 async confirmDevicetype(){


  try {
    await this.auth.DeleteDevicetype(this.addDeleteData).subscribe(

      (response)=>
      {console.log(response)
        if ((response as { message: string }).message === 'Devicetype deleted') {
          window.location.reload();
          this.dialogRef.close();
        }
        
      },
      err=>console.log(err)
    )
   
  } catch (error) {
         // Handle errors here (e.g., show an error message)
         console.error('Error while adding control:', error);
       }
  
  }


  closeDevicetypeCard(){
    this.dialogRef.close();

  }
  
}
