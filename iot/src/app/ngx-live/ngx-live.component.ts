import { MqttServiceWrapper } from '../mqtt-service-wrapper.service';
import { Subscription } from 'rxjs';

import { MqttDataService } from '../mqtt-data.service';
import { Component, OnInit, ViewChild, ElementRef,OnDestroy,AfterViewInit ,Renderer2 } from '@angular/core';
import { Chart, ChartData, ChartDataset, UpdateMode } from 'chart.js'

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-ngx-live',
  templateUrl: './ngx-live.component.html',
  styleUrls: ['./ngx-live.component.css']
})
export class NgxLiveComponent implements OnInit, OnDestroy {

  receivedMessage: string = '';
  subscription: Subscription | undefined;
  sensorDataIn: { [paramType: string]: number[] } = {};
  lineChart: Chart | null = null; // Initialize to null
  events: string[] = [];
  opened: boolean = true;
  receivedData:any;
  userStoreData:any;
  userNameProfile:any;
  isWebSocketOn= true;
  isWebSocketConnected:any;
  webSocketSubscription:any;
  graphDetails:any;
  controlDetails:any;
  filteredControls:any;
  chartscontainer: { [key: string]: Chart | null } = {};
  chartsIdList : { [key: string]: Chart | null } = {};
  deviceId :any;
  // Initialize an object to store data for all graphs
  sensorData: { [key: string]: { data: number[], borderColor: string } } = {};
  no_of_charts:any;
  chartIds: string[] = []
  downloadOptions: string[] = ['1','7', '30', '90', 'custom'];
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  dynamicChartData: any[] = [   ];// Assuming dynamicChartData is an array of chart data
  charts: Chart[] = [];
  chartsInitialized = false;


  constructor(private mqttServiceWrapper: MqttServiceWrapper, private el: ElementRef,private renderer: Renderer2,
    private mqttDataService: MqttDataService,public dialog: MatDialog,
    private router: Router, private auth : AuthenticationService, private dataSharingService:DataSharingService) {}

  async ngOnInit() {
    // Initialize the sensorDataIn structure with empty arrays for each sensor type
    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
   
    this.graphDetails = localStorage.getItem('deviceType');

    if (this.graphDetails){
      const graphOptions = JSON.parse(this.graphDetails);
      try{
        this.deviceId = graphOptions[0]
        const response = await this.auth.onAssignedControlsView(graphOptions[2], graphOptions[3]).toPromise()
        this.controlDetails = response;
        console.log(response);
      this.filteredControls = this.controlDetails.filter((item:any)=> 'graph' in item );
      }
      catch(error){
        console.log(error)
      }
    }
    console.log('graph',this.filteredControls)

 
    this.mqttServiceWrapper.connect(() => {
      console.log('Connected to MQTT broker.');
    });
 

    this.sensorDataIn['dateTime'] = []

    this.initializeChart();

    this.subscribeToTopic();

  }


  subscribeToTopic() {
    const subscribeTopic = '123/data'
    this.subscription = this.mqttServiceWrapper.observe(`${subscribeTopic}`, (message) => {
      this.receivedMessage = message.payload.toString();
      // console.log('Received message:', this.receivedMessage);
      const sensorDataIn = JSON.parse(message.payload.toString());
      this.handlesensorDataIn(sensorDataIn);
    });
  }


  handlesensorDataIn(sensorDataIn: any) { 

    if (sensorDataIn.deviceId === `123`) {
      console.log(this.deviceId)
      if (!this.sensorDataIn[sensorDataIn.paramType]) {
        this.sensorDataIn[sensorDataIn.paramType] = [];  // Initialize the array if it doesn't exist
      }
  
      this.sensorDataIn[sensorDataIn.paramType].push(sensorDataIn.paramValue);

      if (this.sensorDataIn[sensorDataIn.paramType].length > 60) {
        this.sensorDataIn[sensorDataIn.paramType].shift();
      }
  
      if (!this.sensorDataIn['dateTime'].includes(sensorDataIn.dataPoint.split(' ')[1])) {
        this.sensorDataIn['dateTime'].push(sensorDataIn.dataPoint.split(' ')[1]);
      }
  
      // Keep only the latest 60 values
      if (this.sensorDataIn['dateTime'].length > 60) {
        this.sensorDataIn['dateTime'].shift();
      }
     
      }
      
          console.log('Updated Sensor Data:', this.sensorDataIn);  
          // this.mqttDataService.updateSensorData(this.sensorDataIn);
        
          this.updateChart();
          // this.initializeChart();
    }

    
    initializeChart() {
      // Create a container div for the charts
      const chartContainer = this.chartContainer.nativeElement;
    
      // Iterate through filteredControls and create charts
      this.filteredControls.forEach((control: any, index: number) => {
        // Create a new row for every two charts
        if (index % 2 === 0) {
          const rowDiv = document.createElement('div');
          rowDiv.className = 'row';
          chartContainer.appendChild(rowDiv);
        }
    
        // Create a container div for each chart
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-6';
   
        chartContainer.lastChild?.appendChild(colDiv);
    
        // Create controls for each chart
        this.createControls(colDiv, index, control.graph.display_name);
    
        // Create canvas for the chart
        const canvas = this.createCanvasElement(index);
        colDiv.appendChild(canvas);
    
        // Create the chart
        const newChart = new Chart(canvas, {
          type: 'line',
          data: {
            labels: [],  // Initial empty labels
            datasets: this.createDatasets(control.graph.params),
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: control.graph.x,
                  color: 'red',
                },
              },
              y: {
                title: {
                  display: true,
                  text: control.graph.y,
                  color: 'red',
                },
              },
            },
          },
        });
    
        // Push the new chart to the array
        this.charts.push(newChart);
      });
    
      this.chartsInitialized = true;
    }
    
    

    private createControls(container: HTMLElement, index: number, displayName: string) {
      // Create controls dynamically
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'd-flex flex-row justify-content-between';
    
      const header = document.createElement('h1');
      header.textContent = displayName;
      header.classList.add('heading-name');
    
      const downloadSelect = document.createElement('select');
      downloadSelect.className = 'download-button primary';
    
      // Apply additional styles using Renderer2
      this.renderer.setStyle(downloadSelect, 'background-color', '#0554d2');
      this.renderer.setStyle(downloadSelect, 'font-size', '16px');
      this.renderer.setStyle(downloadSelect, 'color', 'white');
      this.renderer.setStyle(downloadSelect, 'border-radius', '3px');
      this.renderer.setStyle(downloadSelect, 'border-width', '0px');
      this.renderer.setStyle(downloadSelect, 'margin-right', '10px');


      

      this.renderer.setStyle(header, 'font-size', '25px');
      this.renderer.setStyle(header, 'font-weight', 'bold');
      this.renderer.setStyle(header, 'color', '#676869');
      this.renderer.setStyle(header, 'margin-left', '90px');
   


    
      this.downloadOptions.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue === 'custom' ? 'Custom' : optionValue + ' Days';
        downloadSelect.appendChild(option);
      });
    
      // Add event listener to handle download option changes
      downloadSelect.addEventListener('change', (event) => this.handleDownloadOptionChange(event, index));
    
      controlsDiv.appendChild(header);
      controlsDiv.appendChild(downloadSelect);
    
      container.appendChild(controlsDiv);
    }
    
   
  private createCanvasElement(index: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 400; // Adjust the width as needed
    canvas.height = 400;
    canvas.style.marginLeft = '50px'; 
    canvas.id = `lineChart${index + 1}`;
    return canvas;
  } 
  
private createDatasets(params: any[]): any[] {
  return params.map((param: any) => {
    const labelName = param.graph_label;

    if (labelName in this.sensorDataIn) {
      
      const sensorData = this.sensorDataIn[labelName];
      const dataset: any = {
        label: labelName,
        data: [...sensorData],
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        hidden: false,
      };

      // Check if a valid color is provided
      if (param.graph_color) {
        dataset.borderColor = param.graph_color;
      }

      return dataset;
    } else {
         
      return {

        label: labelName,
        data: [],
        borderWidth: 2,
        borderColor: param.graph_color,
        fill: false,
        tension: 0.4,
        hidden: false,
      };
    }
  });
}
    
    
handleDownloadOptionChange(event: Event, chartIndex: number) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      // Handle the selected download option for the corresponding chart (chartIndex)
      // You can implement the logic to fetch data based on the selected option
      console.log(`Selected download option for chart ${chartIndex}: ${selectedValue}`);
    }

updateChart() {
  if (!this.chartsInitialized) {
    // Charts haven't been initialized yet, wait for it
    setTimeout(() => this.updateChart(), 100);
    return;
  }

  const latestDateTime = this.sensorDataIn['dateTime'].slice(-60);

  this.filteredControls.forEach((control: any, index: number) => {
    const datasets = this.createDatasets(control.graph.params);
    const updatedData = {
      labels: latestDateTime,
      datasets,
    };

    const chart = this.charts[index];

    if (chart.config && chart.config.options) {
      // Set animation options
      chart.config.options.animation = {
        duration: 800, // Set the animation duration in milliseconds
        easing: 'easeInOutQuad', // Set the easing function for the animation
      };

      // Update chart data
      chart.data.labels = updatedData.labels;
      chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
        dataset.data = updatedData.datasets[datasetIndex].data;
      });

      // Reset animation options to default after the update
      chart.config.options.animation = {
        duration: 0, // Set to 0 to disable additional animations
      };

      // Update the chart
      chart.update();
    }
  });
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
        const dataToSend = 'hello from frontend'
        const jsonData = JSON.stringify(dataToSend)
       
        this.mqttServiceWrapper.publish('topic456', jsonData,{ qos: 0 });
        console.log('Published message:', jsonData);


        
      }

  ngOnDestroy() {
    // Ensure to unsubscribe when the component is destroyed
    this.unsubscribeFromTopic();
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

