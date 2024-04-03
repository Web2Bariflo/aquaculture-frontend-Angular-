// import { Injectable } from '@angular/core';

// import { BehaviorSubject } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {
//   dataValue:any

//   private socket: WebSocket;
//   private jsonDataSubject = new BehaviorSubject<any>(null);
//   public jsonData$ = this.jsonDataSubject.asObservable();
//   // 510751190347617816
//   // ws://127.0.0.1:8000/ws/sc/<Device_id>/
//   // ws://20.244.51.20:8000/ws/sc/510751190347617816/
//   //  valuesweb=[]
//   constructor() {
    
//     this.socket = new WebSocket('ws://127.0.0.1:8000/ws/sc/510751190347617816/'); // Replace with your WebSocket server URL
//     this.socket.onopen = (event) => {
//       console.log('WebSocket is open');

//     };

//     // this.socket.onmessage = (event) => {
//     //   console.log('Received message:');
//     //   // Handle incoming messages here
//     // };
//     this.socket.onmessage = (event) => {
//       console.log('Received message:', event.data);
//       this.jsonDataSubject.next(event);

    
//       // Parse the received JSON data
//       try {
//         const jsonData = JSON.parse(event.data);
//          console.log('json Data',jsonData)
//            this.dataValue=jsonData

//         //  for (const key in jsonData) {
//         //   if (jsonData.hasOwnProperty(key)) {
//         //     const value = jsonData[key];
//         //     console.log(`Key: ${key}, Value: ${value}`);
//         //     // You can handle the key-value pair here as needed
//         //   }
//         // }
//         // Access the data fields

//         // this.jsonDataSubject.next(jsonData);

//         const ORPValue = jsonData.ORP;

        
    
//         // Now you can work with ORPValue
//         console.log('ORP Value:', ORPValue);
        
//         // Handle the data as needed
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//       }



//     };

//     this.socket.onclose = (event) => {
//       console.log('WebSocket is closed');
//     };
//   }

//   sendMessage(message: string) {
//     this.socket.send(message);
//   }

//   closeConnection() {
//     this.socket.close();
//   }
// }


import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root',
})



export class WebsocketService {
  getdeviceid:any; 
  storeid:any;
  private socket: WebSocket;
  private jsonDataSubject = new Subject<any>();
  public jsonData$ = this.jsonDataSubject.asObservable();
  private latestData: any = null;

  constructor(private dataSharingService:DataSharingService) {
    const deviceId = this.dataSharingService.getAccountId()
      this.getdeviceid = localStorage.getItem('setdeviceId')
    
      this.storeid = JSON.parse(this.getdeviceid)
    if (undefined === deviceId){
    
      this.getdeviceid = localStorage.getItem('setdeviceId')
    
      this.storeid = JSON.parse(this.getdeviceid)
      console.log('local',this.storeid)
      this.socket = new WebSocket(`ws://20.244.48.88:8000/ws/sc/${this.storeid}/`);
      this.socket.onopen = (event) => {
        console.log('WebSocket is open');
      };
  
      this.socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        console.log('object:',event)
        // Parse the received JSON data
        try {
          const jsonData = JSON.parse(event.data);
          console.log('JSON Data', jsonData);
  
          // Store the latest data
          this.latestData = jsonData;
  
          // Emit the data to subscribers
          this.jsonDataSubject.next(jsonData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
  
      this.socket.onclose = (event) => {
        console.log('WebSocket is closed');
      };
      
    }
    else{
      console.log(deviceId)
        this.socket = new WebSocket(`ws://20.244.48.88:8000/ws/sc/${deviceId}/`); // Replace with your WebSocket server URLws://20.244.51.20:8000/ws/sc/5107813318934759040/
        this.socket.onopen = (event) => {
          console.log('WebSocket is open');
        };
    
        this.socket.onmessage = (event) => {
          console.log('Received message:', event.data);
          console.log('object:',event)
          // Parse the received JSON data
          try {
            const jsonData = JSON.parse(event.data);
            console.log('JSON Data', jsonData);
    
            // Store the latest data
            this.latestData = jsonData;
    
            // Emit the data to subscribers
            this.jsonDataSubject.next(jsonData);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };
    
        this.socket.onclose = (event) => {
          console.log('WebSocket is closed');
        };}

    
  }

  sendMessage(message: string) {
    this.socket.send(message);
  }

  closeConnection() {
    this.socket.close();
  }

  getWebData() {
    return this.latestData;
  }
}