import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { EditComponent } from '../dashboard/edit/edit.component';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';
import { Edit5Component } from './edit5/edit5/edit5.component';
import { GeneralNewDeviceComponent } from '../general-new-device/general-new-device.component';
import { UserDeviceDeleteComponent } from '../user-device-delete/user-device-delete.component';
import { AssignControlsComponent } from '../assign-controls/assign-controls.component';
import { MqttServiceWrapper } from '../mqtt-service-wrapper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

 
  devicedetails:any=[]
  events: string[] = [];
  opened: boolean = true;
  onOff=false;

  
  subMenuStates: { [key: string]: boolean } = {};


  accountid:any;
  subscriptions: Subscription[] = [];
  topicMessages: { [topic: string]: any[] } = {};
  topicIds = [];
  constructor(private auth: AuthenticationService ,public dialog: MatDialog, private router: Router, private dataSharingService: DataSharingService, private mqttServiceWrapper:MqttServiceWrapper) {}


  openDialog8(): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
     
      
    });

    
    
  }
  
  onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  
 




  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }


  onEditDevice(devicedetails:any): void {
    const dialogRef = this.dialog.open(Edit5Component,{
      width: '400px',
      data:devicedetails
    })

    dialogRef.afterOpened().subscribe(result=>
      console.log('dialog closed'))
   
  }

  onClick8(device:any): void {
    this.router.navigate(['./ngx-user-graph']);
  
    this.dataSharingService.sendAccountId(device[0]);

    localStorage.setItem('setdeviceId', JSON.stringify(device[0]) )

    localStorage.setItem('deviceType',JSON.stringify(device))

      // Redirect to the desired page
      // setTimeout(() => {
      //   location.reload();
      // }, 10)
  }

  


 
 onDeleteDevice(deviceid:any){
  const dialogRef = this.dialog.open(UserDeviceDeleteComponent,{
    width: '400px',
    data: deviceid
  })

  dialogRef.afterOpened().subscribe(result=>
    console.log('dialog closed'))
 

 }
 userStoreData:any;
 userNameProfile:any;
 cardStates: boolean[] = [];
 deviceId:any;

 async ngOnInit(){

 
    // Initialize the toggle state for each card
    this.cardStates = new Array(this.devicedetails.length).fill(false);
 
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName
const savedaccount = localStorage.getItem('accountId');
if (savedaccount) {
  const getaccountid = JSON.parse(savedaccount);
  try {
    const response = await this.auth.onFetchDevices(getaccountid).toPromise();
    console.log(response);
    this.devicedetails = response; // Assuming the result contains the devices
  } catch (error) {
    console.log(error);
  }
} else {
  this.accountid = this.dataSharingService.getAccountId();
  try {
    const response = await this.auth.onFetchDevices(this.accountid).toPromise();
    console.log(response);
    this.devicedetails = response; // Assuming the result contains the devices
  } catch (error) {
    console.log(error);
  }
}

this.mqttServiceWrapper.connect(() => {
  console.log('Connected to MQTT broker.');
});

  this.topicIds = this.devicedetails.result.map((device:any)=>device[0]+'/status')

  console.log(this.topicIds)

    this.subscribeToTopics(this.topicIds);

    }



    subscribeToTopics(topics: string[]) {
      
      topics.forEach((topic) => {
        const newSubscription = this.mqttServiceWrapper.observe(topic, (message) => {
          const sensorDataIn = JSON.parse(message.payload.toString());
          // Assuming you have a data structure to store messages from different topics
          this.storeMessage(topic, sensorDataIn);
        });
    
        // Store the subscription to be able to unsubscribe later if needed
        this.subscriptions.push(newSubscription);
      });
    }
    
    storeMessage(topic: string, message: any) {
      const topicNum: RegExpMatchArray | null = topic.match(/\d+/g);
      if (topicNum !== null){
        const topic_id = parseInt(topicNum[0])
        if (!this.topicMessages[topic_id]) {
          this.topicMessages[topic_id] = [];
        }
        this.topicMessages[topic_id].push(message);
      }
      
      // Assuming you have a data structure to store messages from different topics
      
    }
   

    getStatus(deviceId: string): boolean {
      const deviceInfo = this.topicMessages[deviceId];
      return deviceInfo ? deviceInfo[0].status : false;
    }

 
    ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    

    onClickControls(data:any){
      const dialogRef = this.dialog.open(AssignControlsComponent,{
        width: '800px',
        height: '400px',
        data:data,
      })
    
      dialogRef.afterOpened().subscribe(result=>
        console.log('dialog closed'))
     
    }

    onButtonChange(index: number): void {
      // Toggle the state of the card at the given index
      this.cardStates[index] = !this.cardStates[index];
      console.log(this.cardStates)
    }

}



// addDevice() {
  //   const newDevice = {
  //     id: this.generateUniqueId(), // You can implement your own unique ID generation logic
     
  //     onOff: false // Default status is OFF
  //   };
  //   console.log(newDevice)

  //   this.devicedetails.result.push(newDevice);
  // }

  // private generateUniqueId() {
  //   // Implement your own logic to generate a unique ID here
  //   // This is just a placeholder
  //   return Math.floor(Math.random() * 1000);
  // }


  // openDialog7(): void {
  //   const dialogRef = this.dialog.open(UserNewDeviceComponent, {
  //     width: '400px'
      
  //   });



  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed')
  //   });

    

    
    
  // }
 // openDialog10(): void {
  //   const dialogRef = this.dialog.open(CardComponent, {
  //     width: '250px',
  //     data: { accountId: this.accountId, accountName: this.accountName },
      
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed')
  //     this.accountId = result;
  //     this.accountName = result;
      
  //   });

    
  // }

// onCheck(){
//   this.router.navigate(['./mqtt-device'])
//   console.log("heelo")
// }
  
 