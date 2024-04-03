import { Component, Inject } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-device-slider',
  templateUrl: './device-slider.component.html',
  styleUrls: ['./device-slider.component.css']
})
export class DeviceSliderComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService,private dataSharingService: DataSharingService,private dialog:MatDialogRef<DeviceSliderComponent>){
    this.displayname= data.data.display_name,
  this.virtualpin= data.data.virtual_pin,
  this.minvalue= data.data.min,
  this.maxvalue = data.data.max,
  this.stepvalue = data.data.step_value,
  this.allow_user = data.data.allow_user;
  const oldDisplayName = data.data.display_name;
  const oldVirtualPin = data.data.virtual_pin;
  this.sliders= {oldDisplayName, oldVirtualPin}

}
  displayname='';
  virtualpin: any;
  minvalue:any;
  maxvalue:any;
  stepvalue:any;
  allow_user:false;
  sliders:any;

 async onSlider(){
    const sliderDetails = {type_name: this.data.deviceDetails.type_name, type_ver: this.data.deviceDetails.type_ver, control_key: 'slider', old_dis_name: this.sliders.oldDisplayName,old_vpin: this.sliders.oldVirtualPin,new_dis_name: this.displayname,new_vpin: this.virtualpin,new_alwusr:this.allow_user,new_min:this.minvalue,new_max:this.maxvalue,new_step_value: this.stepvalue}
      

    try {
      await this.auth.onSliderUpdate(sliderDetails).subscribe(response=>
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
