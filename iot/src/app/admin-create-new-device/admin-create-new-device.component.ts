import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-create-new-device',
  templateUrl: './admin-create-new-device.component.html',
  styleUrls: ['./admin-create-new-device.component.css']
})
export class AdminCreateNewDeviceComponent {
  devicename='';
  deviceversion:any;
  ischecked='';
   constructor(private auth:AuthenticationService, private dialogRef: MatDialogRef<AdminCreateNewDeviceComponent>){}


  async onCreateDevice(){
    const devicedetails= {typename: this.devicename, typeversion: this.deviceversion}

    try {
      await  this.auth.onPostDevices(devicedetails).subscribe(response=>
        {console.log(response)
        
          if(response.message === 'Devicetype Created'){
                                      
            this.dialogRef.close();
        
            // Reload the page
            window.location.reload();
      }
      
        
        
        },
        error=>
        console.log(error)
        );
       
    } catch (error) {
              // Handle errors here (e.g., show an error message)
              console.error('Error while adding control:', error);
            }
 
  }
  onClose(){
    this.dialogRef.close()
  }

}
