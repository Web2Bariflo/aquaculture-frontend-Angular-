import { Component, Inject } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService,private dataSharingService: DataSharingService,private dialog:MatDialogRef<DialogContentComponent>){}
slider_dis_name='';
slider_pin: any;
slider_min:any;
slider_max:any;
  stepvalue:any;
  sliderDetails:any;
  slider_step_value:any;
  slider_allow_user= false;
  errorMsg:any;
  async onSlider(){


    if(this.slider_dis_name!=='' && this.slider_pin!==''&& this.slider_min !== '' && this.slider_max !== '' && this.slider_step_value !== ''){
      this.sliderDetails = {slider_dis_name: this.slider_dis_name, slider_pin:this.slider_pin,slider_min:this.slider_min,slider_max:this.slider_max,slider_step_value:this.slider_step_value,type_name: this.data.type_name,type_ver: this.data.type_ver, slider_allow_user: this.slider_allow_user}
   
   
    try {
      await this.auth.onDeviceSlider(this.sliderDetails).subscribe(response=>
        {console.log(response)
        
          if(response.message === 'PIN assigned with a value in slider'){
                                      
            this.dialog.close();
        
            // Reload the page
            window.location.reload();
      }
      
        
        }, error=>
        console.log(error))
    
    } catch (error) {
             // Handle errors here (e.g., show an error message)
             console.error('Error while adding control:', error);
           }
   
    }
    else{
      this.errorMsg= '*Please Enter all the Fields!'
    }
   
    
  }
}
