
import { Component,Inject } from '@angular/core';

import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-device-button',
  templateUrl: './device-button.component.html',
  styleUrls: ['./device-button.component.css']
})

export class DeviceButtonComponent {
  constructor(@Inject (MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService,private dataSharingService: DataSharingService,private dialog:MatDialogRef<DeviceButtonComponent>){
    this.btn_pin= data.data.virtual_pin;
    this.btn_dis_name= data.data.display_name;
   const oldDisplayName= data.data.display_name;
    const oldVirtualPin = data.data.virtual_pin;
    this.details = {oldDisplayName:oldDisplayName, oldVirtualPin: oldVirtualPin }

  }
  btn_pin:any;
  btn_dis_name='';
  alw_usr=false;
  details:any;

  
   async onOnOff(){
      console.log(this.details);
      console.log(this.btn_pin)
      console.log(this.btn_dis_name)
      const buttonDetails = {type_name: this.data.deviceDetails.type_name, type_ver: this.data.deviceDetails.type_ver, control_key: 'button', old_dis_name: this.details.oldDisplayName,old_vpin: this.details.oldVirtualPin,new_dis_name: this.btn_dis_name,new_vpin: this.btn_pin,new_alwusr:this.alw_usr}
    
      try {
         
      await  this.auth.onButtonUpdate(buttonDetails).subscribe(response=>
        {console.log(response)
        
         
     if(response.message === 'control updated'){
                                      
      this.dialog.close();
  
      // Reload the page
      window.location.reload();
}
        
        
        },error=>
        console.log(error))

     
    

      } catch (error) {
               // Handle errors here (e.g., show an error message)
               console.error('Error while adding control:', error);
             }
     
    
    
    
      
    }
  }


 