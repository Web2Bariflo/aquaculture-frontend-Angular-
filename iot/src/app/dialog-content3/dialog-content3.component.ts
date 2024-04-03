
import { Component,Inject } from '@angular/core';

import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-content3',
  templateUrl: './dialog-content3.component.html',
  styleUrls: ['./dialog-content3.component.css']
})
export class DialogContent3Component {
  constructor(@Inject (MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService,private dataSharingService: DataSharingService,private dialog:MatDialogRef<DialogContent3Component>){}
  btn_pin:any;
  btn_dis_name='';
    buttonDetails:any;
    alw_usr= false;
    errorMsg:any;
  
  // async onOnOff(){
  //   this.buttonDetails = {btn_dis_name: this.btn_dis_name, btn_pin:this.btn_pin,type_name: this.data.type_name,type_ver: this.data.type_ver, alw_usr: this.alw_usr}
  //    await   this.auth.onDeviceOnOff(this.buttonDetails).subscribe(response=>
  //         console.log(response), error=>
  //         console.log(error))

  //     }
      async onOnOff() {

        if(this.btn_dis_name !== '' && this.btn_pin !==undefined){
          this.buttonDetails = {
            btn_dis_name: this.btn_dis_name,
            btn_pin: this.btn_pin,
            type_name: this.data.type_name,
            type_ver: this.data.type_ver,
            alw_usr: this.alw_usr,
          };
        
          try {
            // Make the API call to add the control
            await   this.auth.onDeviceOnOff(this.buttonDetails).subscribe(response=>
                      {console.log(response)
                      
                      if(response.message === 'PIN assigned with a value in ON/OFF button'){
                                        
                            this.dialog.close();
                        
                            // Reload the page
                            window.location.reload();
                      }
                      
                      
                      }, error=>
                      console.log(error))
            
            // If the addition is successful, close the dialog
  
          } catch (error) {
            // Handle errors here (e.g., show an error message)
            console.error('Error while adding control:', error);
          }
        }
        else{
          this.errorMsg = '*Please Enter all the fields!'
        }
        
      }
}
