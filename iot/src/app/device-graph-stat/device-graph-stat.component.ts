import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { Chart, ChartTypeRegistry } from 'chart.js';
import { WebsocketService } from '../websocket.service';
// import { CustomDatefilterComponent } from '../custom-datefilter/custom-datefilter.component';
import { AuthenticationService } from '../authentication.service';
// import { CustomDownloadComponent } from '../custom-download/custom-download.component';
import { DataSharingService } from '../data-sharing.service';
import { Subscription } from 'rxjs';


 

@Component({
  selector: 'app-device-graph-stat',
  templateUrl: './device-graph-stat.component.html',
  styleUrls: ['./device-graph-stat.component.css']
})


export class DeviceGraphStatComponent {
  constructor(public dialog: MatDialog, private router: Router,private webSocketService: WebsocketService, private auth : AuthenticationService, private dataSharingService:DataSharingService) {
    window.onload=()=>{
      console.log('LOADED')
    }}
    
lineChart: Chart | null = null; // Initialize to null
events: string[] = [];
opened: boolean = true;
LinechartInstance: Chart | undefined;
receivedData:any;
lineChartSingle: Chart | null = null;


userStoreData:any;
userNameProfile:any;
isWebSocketOn= true;
isWebSocketConnected:any;
webSocketSubscription:any;
graphDetails:any;
controlDetails:any;
filteredControls:any;
// Initialize an object to store data for all graphs
sensorData: { [key: string]: { data: number[], borderColor: string } } = {};

allSensorData: any = {
  labels: [],
  datasets: [],

  
};

ngOnInit(): void {

this.graphDetails = localStorage.getItem('deviceType');

if (this.graphDetails){
  const graphOptions = JSON.parse(this.graphDetails);
  this.auth.onAssignedControlsView(graphOptions[2], graphOptions[3]).subscribe(response=>
    {this.controlDetails = response;
      console.log(this.controlDetails);
     this.filteredControls = this.controlDetails.filter((item:any)=> 'graph' in item );
      console.log('graph',this.filteredControls)
    }, error=> console.log(error))

}
     
// Initialize the chart
this.userStoreData=localStorage.getItem('userData')
const userDataObject = JSON.parse(this.userStoreData);
this.userNameProfile=userDataObject.userName
  // Inside the WebSocket subscription
  this.webSocketSubscription = this.webSocketService.jsonData$.subscribe((data: any) => {
    // Clear existing data
    this.allSensorData.labels = data.time;
    this.allSensorData.datasets = [];
  
    // Update the sensor data
    this.filteredControls.forEach((control: any) => {
      const displayName = control.graph.display_name;
      if (displayName in data) {
        const sensorData = data[displayName];
        this.allSensorData.datasets.push({
          label: displayName,
          data: sensorData,
          borderColor: control.graph.color,
          fill: false,
          tension: 0.4,
          hidden: false,
        });
      }
    });

      // Update the chart for the single sensor
  
  
    // Update the chart
    if (this.LinechartInstance) {
      this.LinechartInstance.update();
    }

    if(this.lineChartSingle){
      this.lineChartSingle.data.labels = data.time;
  this.lineChartSingle.data.datasets[0].data = data.Sensor5; // Replace 'singleSensorData' with the actual data field name
  this.lineChartSingle.update();

    }

    
  });
  



}
ngAfterViewInit(): void {
  this.LinechartInstance = new Chart('lineChart', {
    type: 'line',
    data: this.allSensorData,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Rpm',
          },
        },
      },
    },
  });


  this.lineChartSingle = new Chart('lineChartTwo', {
    type: 'scatter',
    
    data: {
      labels: [1, 2, 1], 
      datasets: [
        {
          label: 'Sensor5',
          data: [4, 5, 6],
          borderColor: 'blue',
          // backgroundColor: 'red',
          pointRadius: 4, // Set pointRadius to 0 to hide individual points
          showLine: true, // Connect points with a line
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Value-1',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Value-2',
          },
        },
      },
    },
  });
  
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
