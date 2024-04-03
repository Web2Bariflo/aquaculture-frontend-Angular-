
import { MqttServiceWrapper } from '../mqtt-service-wrapper.service';
import { Subscription } from 'rxjs';

import { MqttDataService } from '../mqtt-data.service';
import { Component, OnInit, ViewChild, ElementRef,OnDestroy } from '@angular/core';
import { Chart, ChartData, ChartDataset, UpdateMode,ChartOptions } from 'chart.js'

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';
import 'chartjs-plugin-dragdata';
import 'chartjs-plugin-zoom';


interface MyChartOptions extends ChartOptions {
  plugins?: {
    zoom?: {
      limits?: {
        y?: {
          min?: number;
          max?: number;
          minRange?: number;
        };
      };
      pan?: {
        enabled?: boolean;
        mode?: 'xy';
      };
      zoom?: {
        wheel?: {
          enabled?: boolean;
        };
        pinch?: {
          enabled?: boolean;
        };
        mode?: 'xy';
      };
    };
    dragData?: {
      enabled?: boolean;
      round?: number;
    };
  };
}


@Component({
  selector: 'app-ngx-printing',
  templateUrl: './ngx-printing.component.html',
  styleUrls: ['./ngx-printing.component.css']
})
export class NgxPrintingComponent implements OnInit, OnDestroy {

  receivedMessage: string = '';
  subscription: Subscription | undefined;

  // Structure to store sensor data
  sensorDataIn: { [paramType: string]: number[] } = {};




  lineChart: Chart | null = null; // Initialize to null
  events: string[] = [];
  opened: boolean = true;
  LinechartInstance: Chart | undefined;
  receivedData:any;
  LineChartSingle: Chart | null = null;
  lineChartOne:Chart | null =null;
  lineChartTwo:Chart |null =null;
  
  userStoreData:any;
  userNameProfile:any;
  isWebSocketOn= true;
  isWebSocketConnected:any;
  webSocketSubscription:any;
  graphDetails:any;
  controlDetails:any;
  filteredControls:any;

  deviceId :any;
  // Initialize an object to store data for all graphs
  sensorData: { [key: string]: { data: number[], borderColor: string } } = {};
  

  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas!: ElementRef;

  private allSensorData: ChartData = {
    labels: [],
    datasets: [],
  };

  private allSensorData1: ChartData = {
    labels: [],
    datasets: [],
  };
  
  private allSensorData2: ChartData = {
    labels: [],
    datasets: [],
  };
  gaugeType= 'full';
  gaugeValue=0;
  gaugeLabel = "Completed";
  gaugeAppendText = "%";
  thickness = 20;
  thresholdConfig = {
    '0': {color: 'orange'},
    '40': {color: 'red'},
    '75.5': {color: 'green'}
};

printStatus:any;
gaugeType1 = 'arch'; // You can use 'full' or 'semi' as well
  gaugeLabel1 = 'Time Left';
  gaugeAppendText1 = '%';
  timeLeft:any; // Initial time in seconds
  timeLeftPercentage: any;
timeSeconds:any;
flagCheck =0;
initialTime:any;

  constructor(private mqttServiceWrapper: MqttServiceWrapper,private mqttDataService: MqttDataService,public dialog: MatDialog, private router: Router, private auth : AuthenticationService, private dataSharingService:DataSharingService) {}

  ngOnInit() {
    // Initialize the sensorDataIn structure with empty arrays for each sensor type


    document.documentElement.style.setProperty("--p", "0");


    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
    console.log(this.deviceId)
    this.graphDetails = localStorage.getItem('deviceType');

        if (this.graphDetails){
          const graphOptions = JSON.parse(this.graphDetails);
          this.deviceId = graphOptions[0]
          this.auth.onAssignedControlsView(graphOptions[2], graphOptions[3]).subscribe(response=>
            {this.controlDetails = response;
              console.log(this.controlDetails);
            this.filteredControls = this.controlDetails.filter((item:any)=> 'graph' in item );
              console.log('graph',this.filteredControls)
            }, error=> console.log(error))

        }
     

    this.mqttServiceWrapper.connect(() => {
      console.log('Connected to MQTT broker.');
    });
 

    this.sensorDataIn['dateTime'] = []

    this.initializeChart();
    this.subscribeToTopic();
  }







  subscribeToTopic() {
    const subscribeTopic = '123/data'
    this.subscription = this.mqttServiceWrapper.observe(`lora123`, (message) => {
      this.receivedMessage = message.payload.toString();
      // console.log('Received message:', this.receivedMessage);
      const sensorDataIn = JSON.parse(message.payload.toString());
      this.handlesensorDataIn(sensorDataIn);
    });
  }

  handlesensorDataIn(sensorDataIn: any) {
    // Check if the received data has the correct deviceId 913154878189189
   

    if (sensorDataIn.deviceId === `123`) {
      // Update the sensorDataIn structure with the latest values for each sensor type
      console.log(this.deviceId)
      if (!this.sensorDataIn[sensorDataIn.paramType]) {
        // Initialize the array if it doesn't exist
        this.sensorDataIn[sensorDataIn.paramType] = [];
      }
  
      this.sensorDataIn[sensorDataIn.paramType].push(sensorDataIn.paramValue);

      if (sensorDataIn.paramType === 'printTimeLeft' && this.flagCheck === 0){
        this.initialTime = sensorDataIn.paramValue;
        this.flagCheck =1;

      }

      if (this.sensorDataIn[sensorDataIn.paramType].length > 60) {
        this.sensorDataIn[sensorDataIn.paramType].shift();
      }
  

      // You can also store the 'time' values similarly if needed
      if (!this.sensorDataIn['dateTime'].includes(sensorDataIn.dataPoint.split(' ')[1])) {
        this.sensorDataIn['dateTime'].push(sensorDataIn.dataPoint.split(' ')[1]);
      }
  
      // Keep only the latest 60 values
      if (this.sensorDataIn['dateTime'].length > 60) {
        this.sensorDataIn['dateTime'].shift();
      }
     
      }
      
          // console.log('Updated Sensor Data:', this.sensorDataIn);
          
          this.mqttDataService.updateSensorData(this.sensorDataIn);
        
          this.updateChart();

          // this.initializeChart();
      
    }


    
  

    initializeChart() {
      if (this.LinechartInstance) {
    // Destroy the existing chart
    this.LinechartInstance.destroy();
     }

    if(this.LineChartSingle){
      this.LineChartSingle.destroy();
    }
      // const canvas = this.lineChartCanvas.nativeElement;
      this.LinechartInstance = new Chart('lineChartOne', {
        type: 'line',
        data: this.allSensorData1,
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
                color: 'red',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Bed Temperature',
                color: 'red',
              },
            },
          },
          plugins: {
            zoom: {
              limits: {
                y: { min: 0, max: 200, minRange: 50 },
              },
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: false,
                },
                pinch: {
                  enabled: false,
                },
                mode: 'xy',
              },
            },
            dragData: {
              enabled: true,
              round: 0, // Round to the nearest integer
            },
          },
        } as MyChartOptions
      });

      this.LineChartSingle = new Chart('lineChartTwo', {
        type: 'line',
        data: this.allSensorData2,
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
                color:'red',

              },
            },
            y: {
              title: {
                display: true,
                text: 'Tool Temperature',
                color:'red',

              },
              // beginAtZero: true, 
            },
          },
          plugins: {
            zoom: {
              limits: {
                y: { min: 0, max: 200, minRange: 50 },
              },
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: false,
                },
                pinch: {
                  enabled: false,
                },
                mode: 'xy',
              },
            },
            dragData: {
              enabled: true,
              round: 0, // Round to the nearest integer
            },
          },
        } as MyChartOptions
      });



    }
  
// updateChart() {

// this.allSensorData.labels = this.sensorDataIn['dateTime'];
// this.allSensorData1.labels= this.sensorDataIn['dateTime'];
// this.allSensorData2.labels = this.sensorDataIn['dateTime'];
// this.allSensorData.datasets = [];
// this.allSensorData1.datasets = [];
// this.allSensorData2.datasets = [];

// this.filteredControls.forEach((control: any) => {
//   const displayName = control.graph.display_name;
//   if (displayName in this.sensorDataIn) {
//     const sensorData = this.sensorDataIn[displayName];
//     this.allSensorData.datasets.push({
//       label: displayName,
//       data: sensorData,
//       borderColor: control.graph.color,
//       fill: false,
//       tension: 0.4,
//       hidden: false,
//     });
//   }
// });


// this.allSensorData.datasets.forEach((set:any)=>{
//   if (set.label === 'X' || set.label === 'Y' || set.label === 'Z'){
//     this.allSensorData2.datasets.push(set);
//   }
//   else{
//     this.allSensorData1.datasets.push(set);
//   }
// })

//  if (this.LinechartInstance) {
//         this.LinechartInstance.data = this.allSensorData1;
//         this.LinechartInstance.update();
//       }
//  if (this.LineChartSingle){
//         this.LineChartSingle.data = this.allSensorData2;
//         this.LineChartSingle.update();
//       }
//     }
    
// updateChart() {
//   this.allSensorData.labels = this.sensorDataIn['dateTime'];

//   this.filteredControls.forEach((control: any) => {
//     const displayName = control.graph.display_name;
//     if (displayName in this.sensorDataIn) {
//       const sensorData = this.sensorDataIn[displayName];
//       if(displayName !== 'X' && displayName !== 'Y' && displayName !=='Z'){

//         const existingDatasetIndex = this.allSensorData1.datasets.findIndex((set: any) => set.label === displayName);

//         if (existingDatasetIndex !== -1) {
//           // Update existing dataset in allSensorData1
//           this.allSensorData1.datasets[existingDatasetIndex].data = sensorData;
//         } else {
//           // Add new dataset to allSensorData1
//           this.allSensorData1.datasets.push({
//             label: displayName,
//             data: sensorData,
//             borderColor: control.graph.color,
//             fill: false,
//             tension: 0.4,
//             hidden: false,
//           });
//         }

//       }

//       else{

//         const existingDatasetIndex2 = this.allSensorData2.datasets.findIndex((existingSet: any) => existingSet.label === displayName);

//         if (existingDatasetIndex2 !== -1) {
//           // Update existing dataset in allSensorData2
//           this.allSensorData2.datasets[existingDatasetIndex2].data = sensorData;
//         } else {
//           // Add new dataset to allSensorData2
//           this.allSensorData2.datasets.push({
//             label: displayName,
//             data: sensorData,
//             borderColor: control.graph.color,
//             fill: false,
//             tension: 0.4,
//             hidden: false,
//           });
//         }


//       }
    
//     }
//   });



//   if (this.LinechartInstance) {
//     this.allSensorData1.labels = this.sensorDataIn['dateTime'];
//     this.LinechartInstance.update();
//   }

//   if (this.LineChartSingle) {
//     this.allSensorData2.labels = this.sensorDataIn['dateTime'];
//     this.LineChartSingle.update();
//   }
// }
updateGauge(){
  this.timeLeftPercentage = (this.timeSeconds / this.initialTime) * 100; 
}
calculateMinutes(seconds:any){
  const mins = seconds/60;
  const secs = seconds%60;

  const minFormat = String(mins).padStart(2,'0')
  const secFormat = String(secs).padStart(2,'0')

this.timeLeft = `${minFormat}:${secFormat}`


}

updateChart() {
  const latestDateTime = this.sensorDataIn['dateTime'].slice(-60);

  this.allSensorData.labels = latestDateTime;
  const errorLength = this.sensorDataIn['error'].length

  const errorNotify = this.sensorDataIn['error'].slice(errorLength-1)

  const convStr = String(errorNotify[0])

  if (convStr!== '') {
   this.errorAlert();
  }
  const compLength = this.sensorDataIn['completion'].length

  const compNotify = this.sensorDataIn['completion'].slice(compLength-1)



  this.gaugeValue = compNotify[0]


  const printLength = this.sensorDataIn['printing'].length

  const printNotify = this.sensorDataIn['printing'].slice(printLength-1)

  this.printStatus = printNotify[0]


  const timeLength = this.sensorDataIn['printTimeLeft'].length

  const timeNotify = this.sensorDataIn['printTimeLeft'].slice(timeLength-1)

   this.calculateMinutes(timeNotify[0])
  
   this.timeSeconds = timeNotify[0]
   this.updateGauge();

  this.filteredControls.forEach((control: any) => {
    const displayName = control.graph.display_name;

    if (displayName in this.sensorDataIn) {
      const sensorData = this.sensorDataIn[displayName];

      if (displayName === 'bed_actual' || displayName === 'bed_target') {
        const existingDatasetIndex = this.allSensorData1.datasets.findIndex(
          (set: any) => set.label === displayName
        );

        if (existingDatasetIndex !== -1) {
          // Update existing dataset in allSensorData1
          this.allSensorData1.datasets[existingDatasetIndex].data = [...sensorData];
        } else {
          // Add new dataset to allSensorData1
          this.allSensorData1.datasets.push({
            label: displayName,
            data: [...sensorData],
            borderColor: control.graph.color,
            fill: false,
            tension: 0.4,
            hidden: false,
          });
        }
      } else {
          if (displayName === 'tool_actual' || displayName === 'tool_target') {
        const existingDatasetIndex2 = this.allSensorData2.datasets.findIndex(
          (existingSet: any) => existingSet.label === displayName
        );

        if (existingDatasetIndex2 !== -1) {
          // Update existing dataset in allSensorData2
          this.allSensorData2.datasets[existingDatasetIndex2].data = [...sensorData];
        } else {
          // Add new dataset to allSensorData2
          this.allSensorData2.datasets.push({
            label: displayName,
            data: [...sensorData],
            borderColor: control.graph.color,
            fill: false,
            tension: 0.4,
            hidden: false,
          });
        }
      }}
    }
  });

  if (this.LinechartInstance) {
    this.allSensorData1.labels = latestDateTime;
    this.LinechartInstance.data.labels = latestDateTime;
    // this.LinechartInstance.data.datasets = [...this.allSensorData1.datasets]; // Update datasets
    this.LinechartInstance.update();
  }

  if (this.LineChartSingle) {
    this.allSensorData2.labels = latestDateTime;
    this.LineChartSingle.data.labels = latestDateTime;
    // this.LineChartSingle.data.datasets = [...this.allSensorData2.datasets]; // Update datasets
    this.LineChartSingle.update();
  }
}




  unsubscribeFromTopic() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Unsubscribed from topic.');
    }
  }

  disconnect() {
    this.mqttServiceWrapper.disconnect();
    console.log('Disconnected from MQTT broker.');
  }

   publishData() {

        // Example of publishing data to 'topic123'
        const dataToSend = {'message':true}
        const jsonData = JSON.stringify(dataToSend)
       
        this.mqttServiceWrapper.publish('topic123', jsonData,{ qos: 0 });
        console.log('Published message:', jsonData);


        
      }

  ngOnDestroy() {
    // Ensure to unsubscribe when the component is destroyed
    this.unsubscribeFromTopic();
  }

  errorAlert(){
    alert(`Error Alert: Printing Error`)
  }



  onBackStats():void{
    this.router.navigate(['./user-account-devices'])
    }
    
    onLogout():void{
    this.router.navigate(['/login'])
    
    }
    subMenuStates: { [key: string]: boolean } = {};
    
    
    onLogout1():void{
    this.router.navigate(['/login'])
    
    }
    
    onSelectChange(event:any){
    
    }
    
    toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
    }
    
    
    isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
    }



}

  
// updateChart() {

//   this.allSensorData.labels = this.sensorDataIn['dateTime'];
//   this.allSensorData1.labels= this.sensorDataIn['dateTime'];
//   this.allSensorData2.labels = this.sensorDataIn['dateTime'];
//   this.allSensorData.datasets = [];
//   this.allSensorData1.datasets = [];
//   this.allSensorData2.datasets = [];
  
//   this.filteredControls.forEach((control: any) => {
//     const displayName = control.graph.display_name;
//     if (displayName in this.sensorDataIn) {
//       const sensorData = this.sensorDataIn[displayName];
//       this.allSensorData.datasets.push({
//         label: displayName,
//         data: sensorData,
//         borderColor: control.graph.color,
//         fill: false,
//         tension: 0.4,
//         hidden: false,
//       });
//     }
//   });
  
  
//   this.allSensorData.datasets.forEach((set:any)=>{
//     if (set.label === 'X' || set.label === 'Y' || set.label === 'Z'){
//       this.allSensorData2.datasets.push(set);
//     }
//     else{
//       this.allSensorData1.datasets.push(set);
//     }
//   })
  
//    if (this.LinechartInstance) {
//           this.LinechartInstance.data = this.allSensorData1;
//           this.LinechartInstance.update();
//         }
//    if (this.LineChartSingle){
//           this.LineChartSingle.data = this.allSensorData2;
//           this.LineChartSingle.update();
//         }
//       }
      