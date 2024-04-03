import { Component,Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';

import { MqttServiceWrapper } from '../mqtt-service-wrapper.service';
   

@Component({
  selector: 'app-assign-controls',
  templateUrl: './assign-controls.component.html',
  styleUrls: ['./assign-controls.component.css']
})
export class AssignControlsComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService, private mqttServiceWrapper:MqttServiceWrapper){}
  isToggleOn: boolean = false;
  sliderValue: number = 2;
  minValue = 0;
  maxValue = 10;
  stepValue = 1;
  buttonsInfo:any;
  onSliderInput() {
    // Handle slider input changes here
    console.log('Slider value changed:', this.sliderValue);
  }
  controlDetails:any;
  filteredControls:any;
  addStatusfilter:any;

  async ngOnInit() {
    console.log(this.data)

    this.mqttServiceWrapper.connect(() => {
      console.log('Connected to MQTT broker.');
    });


      await this.auth.onAssignedControlsView(this.data[2], this.data[3]).subscribe(response=>
        {this.controlDetails = response;
          console.log(this.controlDetails);
         this.filteredControls = this.controlDetails.filter((item:any)=> 'button' in item || 'slider' in item);
          console.log(this.filteredControls)

          
        this.buttonsInfo = this.filteredControls
        .filter((item: any) => 'button' in item)
        .map((buttonItem: any) => (
          {
          display_name: buttonItem.button.display_name,
          status: this.isToggleOn,
        }));
        console.log('button',this.buttonsInfo)
        }, error=> console.log(error))


      
       

      }
     
    
 
      onToggleChange(item:any){

        console.log('before', item)
        
        this.buttonsInfo = this.filteredControls
      .filter((item: any) => 'button' in item)
      .map((buttonItem: any) => {
        if (buttonItem.button.isToggleOn === undefined){
          return {
            display_id: this.data[0],
            virtual_pin: buttonItem.button.virtual_pin,
            status: false ,
          }
        }
        else{
          return {
            display_id: this.data[0],
            virtual_pin: buttonItem.button.virtual_pin,
            status: buttonItem.button.isToggleOn ,
          }
        }
        
        });
      console.log(this.buttonsInfo)
      const jsonData = JSON.stringify(this.buttonsInfo)
      
      this.mqttServiceWrapper.publish(`${this.data[0]}`, jsonData,{ qos: 0 });
      console.log('Published message:', jsonData);



      }



      publishData() {

        // Example of publishing data to 'topic123'
        const dataToSend = 'hello from frontend'
        const jsonData = JSON.stringify(dataToSend)
       

        
      }


  
}
