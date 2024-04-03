
import { Component, OnInit, OnDestroy, AfterViewInit,ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { Chart, ChartTypeRegistry , ChartData} from 'chart.js';
import { WebsocketService } from '../websocket.service';
import { MqttServiceWrapper } from '../mqtt-service-wrapper.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-ponds-graph',
  templateUrl: './ponds-graph.component.html',
  styleUrls: ['./ponds-graph.component.css']
})
export class PondsGraphComponent implements OnInit, OnDestroy,AfterViewInit{
  
  receivedMessage: string = '';
  subscription: Subscription | undefined;

  events: string[] = [];
  opened: boolean = true;
  LinechartInstance!: Chart;
  graphDetails:any;
  deviceId:any;
  jsonData: any;
  dataList:any=[]
  chart: any;
  mqttData:any;
  controlDetails:any;
  filteredControls:any;
  chart1: Chart | undefined;
  chart2: Chart | undefined;
  chart3: Chart | undefined;
  chart4: Chart | undefined;
  chart5: Chart | undefined;
  chart6: Chart | undefined;
  userStoreData:any;
  userNameProfile:any;
  shouldRefresh: boolean = true;
    // this.initChart();
  subMenuStates: { [key: string]: boolean } = {};
  accountId: string[] = [];
  accountName: string[] = [];
  @ViewChildren('canvasElement') canvasElements!: QueryList<ElementRef>;

  // Array to store Chart instances
  charts: Chart[] = [];
  sensorData: { [key: string]: { data: number[], borderColor: string } } = {};
  sensorDataIn: { [paramType: string]: number[] } = {};

  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas!: ElementRef;

  private allSensorData: ChartData = {
    labels: [],
    datasets: [],
  };

  constructor(public dialog: MatDialog,private auth:AuthenticationService, private router: Router, private webSocketService: WebsocketService, private mqttServiceWrapper: MqttServiceWrapper) {
    window.onload=()=>{
      console.log('LOADED')
    }
    

  }

  ngOnInit(): void {
       
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
         
    // Initialize the chart
    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
    console.log(this.deviceId)
    

    this.mqttServiceWrapper.connect(() => {
      console.log('Connected to MQTT broker.');
    });
  this.sensorDataIn['dateTime'] = []
    
  
  this.webSocketService.jsonData$.subscribe((data: any) => {
    this.jsonData = data;

    // Update chart data for each canvas
    this.updateChartData(this.jsonData.Ph, 0, this.jsonData.Time, 'Ph','blue');
    this.updateChartData(this.jsonData.voltage, 1, this.jsonData.Time,'Voltage','red');
    this.updateChartData(this.jsonData.Current, 2, this.jsonData.Time,'Current','black');
    this.updateChartData(this.jsonData.ORP, 3, this.jsonData.Time,'ORP','orange');
    this.updateChartData(this.jsonData.CPU_TEMPERATURE, 4, this.jsonData.Time,'Temperature','green');
    this.updateChartData(this.jsonData.DO, 5, this.jsonData.Time,'DO','violet');
  });

  
 

 }

 subscribeToTopic() {
  this.subscription = this.mqttServiceWrapper.observe('topic123', (message) => {
    this.receivedMessage = message.payload.toString();
    // console.log('Received message:', this.receivedMessage);
    const sensorDataIn = JSON.parse(message.payload.toString());
    this.handlesensorDataIn(sensorDataIn);
  });
}

handlesensorDataIn(sensorDataIn: any) {
  // Check if the received data has the correct deviceId 913154878189189


  if (sensorDataIn.deviceId === `${this.deviceId}`) {
    // Update the sensorDataIn structure with the latest values for each sensor type

    if (!this.sensorDataIn[sensorDataIn.paramType]) {
      // Initialize the array if it doesn't exist
      this.sensorDataIn[sensorDataIn.paramType] = [];
    }

    this.sensorDataIn[sensorDataIn.paramType].push(sensorDataIn.paramValue);

    if (this.sensorDataIn[sensorDataIn.paramType].length > 60) {
      this.sensorDataIn[sensorDataIn.paramType].shift();
    }

    // if (this.sensorDataIn[sensorDataIn.paramType]) {
    //   this.sensorDataIn[sensorDataIn.paramType].push(sensorDataIn.paramValue);

    //   // Keep only the latest 60 values
    //   if (this.sensorDataIn[sensorDataIn.paramType].length > 60) {
    //     this.sensorDataIn[sensorDataIn.paramType].shift();
    //   }
    // }

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
        
       





  
      

    


  }

 ngAfterViewInit(): void {

  // Initialize Chart instances after the view is initialized
  this.canvasElements.forEach((canvasElement, index) => {
    const chart = new Chart(canvasElement.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Sample Ph',
            data: [],
            borderColor: '',
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Store the chart instance in the array
    this.charts[index] = chart;
  });
}

// Update chart data
updateChartData(datadevice: any, chartIndex: number, dataTime:any, label: string, bordercolor: string) {
  if (this.charts[chartIndex]) {
    this.charts[chartIndex].data.labels = dataTime;
    this.charts[chartIndex].data.datasets[0].data = datadevice;
    this.charts[chartIndex].data.datasets[0].label = label;
    this.charts[chartIndex].data.datasets[0].borderColor = bordercolor;
    this.charts[chartIndex].update(); // Update the chart
  }
}

ngOnDestroy() {
  // Destroy all chart instances when the component is destroyed
  this.charts.forEach(chart => {
    if (chart) {
      chart.destroy();
    }
  });
}



sendMessageToServer(message: string) {
this.webSocketService.sendMessage(message);
}



onBackStats():void{
  this.router.navigate(['./user-account-devices'])
}


openDialog7(): void {
  const dialogRef = this.dialog.open(CardComponent, {
    width: '250px',
    data: { accountId: this.accountId, accountName: this.accountName },
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed')
    this.accountId = result;
    this.accountName = result;
    
  });

  
  
}

onLogout():void{
 this.router.navigate(['/login'])

}


onLogout1():void{
 this.router.navigate(['/login'])

}




onRefresh():void{
  this.router.navigate(['./device-stats'])
}






toggleSubMenu(subMenuKey: string): void {
  this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
}

isSubMenuOpen(subMenuKey: string): boolean {
  return this.subMenuStates[subMenuKey] || false;
}


onClick7(): void {
  this.router.navigate(['./edit5']);
}

onClick8(): void {
  this.router.navigate(['./stat']);
}






    
    
  }
  
  






