

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
  selector: 'app-ngx-dynamic',
  templateUrl: './ngx-dynamic.component.html',
  styleUrls: ['./ngx-dynamic.component.css']
})
export class NgxDynamicComponent implements OnInit, OnDestroy {

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
  downloadOptions: string[] = ['Download','1','7', '30', '90', 'custom'];
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
    console.log("UserData",this.userStoreData,userDataObject,this.graphDetails);
    

 
    this.mqttServiceWrapper.connect(() => {
      console.log('Connected to MQTT broker.');
    });
 

    this.sensorDataIn['dateTime'] = []

    this.initializeChart();

    this.handleResponsiveLayout();
    window.addEventListener('resize', () => this.handleResponsiveLayout());

    this.subscribeToTopic();




  }


  subscribeToTopic() {
    const subscribeTopic = this.deviceId+'/data'
    this.subscription = this.mqttServiceWrapper.observe(`${subscribeTopic}`, (message) => {
      this.receivedMessage = message.payload.toString();
      // console.log('Received message:', this.receivedMessage);
      const sensorDataIn = JSON.parse(message.payload.toString());
      this.handlesensorDataIn(sensorDataIn);
      console.log("Subscription Data",subscribeTopic);
    });
  }
  


  handlesensorDataIn(sensorDataIn: any) { 

    if (sensorDataIn.deviceId === `${this.deviceId}`) {
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
      
          // console.log('Updated Sensor Data:', this.sensorDataIn);  
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
    
    handleResponsiveLayout() {
      const screenWidth = window.innerWidth;
      const chartsPerRow = screenWidth < 768 ? 1 : 2;
  
      const chartContainers = this.chartContainer.nativeElement.querySelectorAll('.col-lg-6');
      chartContainers.forEach((container: HTMLElement, index: number) => {
        this.renderer.setStyle(container, 'width', `${100 / chartsPerRow}%`);
      });


      const canvasElements = document.querySelectorAll('canvas');
  const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed

  canvasElements.forEach((canvas: HTMLCanvasElement) => {
    canvas.style.marginLeft = isMobile ? '2px' : '50px';
  });

 

    }

    private createControls(container: HTMLElement, index: number, displayName: string) {
      // Create controls dynamically
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'd-flex flex-row justify-content-between';
    
      const header = document.createElement('h1');
      header.textContent = displayName;
      header.classList.add('heading-name');
    
      const downloadSelect = document.createElement('select');
     
    
      // Apply additional styles using Renderer2
      this.renderer.setStyle(downloadSelect, 'background-color', '#80BBF1');
      this.renderer.setStyle(downloadSelect, 'font-size', '16px');
      this.renderer.setStyle(downloadSelect, 'color', 'white');
      this.renderer.setStyle(downloadSelect, 'border-radius', '6px');
      this.renderer.setStyle(downloadSelect, 'border-width', '0px');
      this.renderer.setStyle(downloadSelect, 'margin-right', '10px');
      this.renderer.setStyle(downloadSelect, 'height', '50px');
      this.renderer.setStyle(downloadSelect, 'width', '100px');


      this.renderer.setStyle(controlsDiv, 'margin-bottom', '20px' );
      this.renderer.setStyle(controlsDiv, 'margin-top', '15px' );

      this.renderer.setStyle(header, 'font-size', '25px');
      this.renderer.setStyle(header, 'font-weight', 'bold');
      this.renderer.setStyle(header, 'color', '#676869');
      this.renderer.setStyle(header, 'margin-left', '90px');
   
      const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
      const headerMarginLeft = isMobile ? '2px' : '90px';
      const headerFont = isMobile? '12px': '25px';
      
      this.renderer.setStyle(header, 'margin-left', headerMarginLeft);
      this.renderer.setStyle(header, 'font-size', headerFont);

      const selectWidth = isMobile? '70px': '100px';
      const selectHeight = isMobile? '25px': '50px';
      const selectFont = isMobile? '10px': '16px';

      const controlMargin = isMobile? '5px': '20px';

      this.renderer.setStyle(downloadSelect, 'width', selectWidth);
      this.renderer.setStyle(downloadSelect, 'font-size', selectFont);

      this.renderer.setStyle(downloadSelect, 'height', selectHeight);
      this.renderer.setStyle(controlsDiv, 'margin-bottom', controlMargin);

    
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
    this.handleResponsiveLayout()
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
      window.location.href = 'http://aqua.bariflorobotics.com/login'
  
      localStorage.removeItem('token')
    }
    onLogout1():void{
      window.location.href = 'http://aqua.bariflorobotics.com/login'
  
      localStorage.removeItem('token')
    }
    
    subMenuStates: { [key: string]: boolean } = {};
    
    
    
    onSelectChange(event:any){
    
    }
    
    toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
    }
    
    
    isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
    }


}



 // const latestDateTime = this.sensorDataIn['dateTime'].slice(-60);

  // // Clear the dynamicChartData array before updating
  // this.dynamicChartData = [];

  // this.filteredControls.forEach((control: any) => {
  //   const params = control.graph.params;

  //   const datasets = params.map((param: any) => {
  //     const labelName = param.graph_label;
    
  //     if (labelName in this.sensorDataIn) {
  //       const sensorData = this.sensorDataIn[labelName];
    
  //       return {
  //         label: labelName,
  //         data: [...sensorData],
  //         borderColor: param.graph_color,
  //         borderWidth: 2,
  //         fill: false,
  //       };
  //     } else {
  //       // Handle the case where labelName is not in sensorDataIn
  //       return {
  //         label: labelName,
  //         data: [], // You may adjust this based on your use case
  //         borderColor: 'defaultBorderColor',
  //         borderWidth: 2,
  //         fill: false,
  //       };
  //     }
  //   }).filter((dataset: any) => dataset);


  //   this.dynamicChartData.push({
  //     labels: latestDateTime,
  //     datasets,
  //   });
  // });

  // console.log('data', this.charts);


  // this.charts.forEach((chart, i) => {
  //   const updatedData = this.dynamicChartData[i];

  //   console.log('charts',updatedData)
  //   chart.data.labels = updatedData.labels;
  //   chart.data.datasets = updatedData.datasets;
  //   chart.update();
  // });


      // this.dynamicChartData.forEach((chartData, i) => {

      
    // initializeChart() {
    //   const chartInstances = Object.keys(this.chartscontainer);
    //   const chartIdNames = Object.keys(this.chartsIdList);
    
    //   for (let i = 0; i < this.no_of_charts; i++) {
    //     const chartIdName = chartIdNames[i];
    //     console.log(chartIdName)
    //     if (this.chartscontainer[chartInstances[i]]) {
    //       this.chartscontainer[chartInstances[i]]?.destroy();
    //     }
    
    //     if (chartIdName) {
    //       this.chartscontainer[chartInstances[i]] = new Chart(chartIdName, {
    //         type: 'line',
    //         data: this.allSensorData1,
    //         options: {
    //           responsive: true,
    //           scales: {
    //             x: {
    //               title: {
    //                 display: true,
    //                 text: 'Time',
    //                 color: 'red',
    //               },
    //             },
    //             y: {
    //               title: {
    //                 display: true,
    //                 text: 'Rpm',
    //                 color: 'red',
    //               },
    //               // beginAtZero: true, 
    //             },
    //           },
    //         },
    //       });
    //     }
    //   }
    // }


       //   const chartId = `lineChart${i + 1}`;
  
      //   const newChart = new Chart(chartId, {
      //     type: 'line',
      //     data: chartData,
      //     options: {
      //       responsive: true,
      //       scales: {
      //         x: {
      //           title: {
      //             display: true,
      //             text: 'Time',
      //             color: 'red',
      //           },
      //         },
      //         y: {
      //           title: {
      //             display: true,
      //             text: 'Rpm',
      //             color: 'red',
      //           },
      //         },
      //       },
      //       // plugins: {
      //       //   zoom: {
      //       //     limits: {
      //       //       y: { min: 0, max: 200, minRange: 50 },
      //       //     },
      //       //     pan: {
      //       //       enabled: true,
      //       //       mode: 'xy',
      //       //     },
      //       //     zoom: {
      //       //       wheel: {
      //       //         enabled: false,
      //       //       },
      //       //       pinch: {
      //       //         enabled: false,
      //       //       },
      //       //       mode: 'xy',
      //       //     },
      //       //   },
      //       // },
      //     },
      //   });
  
      //   this.charts.push(newChart);
      // });



      // updateChart() {
//   const latestDateTime = this.sensorDataIn['dateTime'].slice(-60);

//   this.allSensorData.labels = latestDateTime;

//   this.filteredControls.forEach((control: any) => {
//     const displayName = control.graph.params;

//     displayName.forEach((parameters:any)=>{
//       const label_name = parameters.graph_label;
//       const color_name = parameters.graph_color;

//       if (label_name in this.sensorDataIn) {
//         const sensorData = this.sensorDataIn[label_name];
  
//           const existingDatasetIndex = this.allSensorData1.datasets.findIndex(
//             (set: any) => set.label === label_name
//           );
  
//           if (existingDatasetIndex !== -1) {
//             // Update existing dataset in allSensorData1
//             this.allSensorData1.datasets[existingDatasetIndex].data = [...sensorData];
//           } else {
//             // Add new dataset to allSensorData1
//             this.allSensorData1.datasets.push({
//               label: displayName,
//               data: [...sensorData],
//               borderColor: control.graph.color,
//               fill: false,
//               tension: 0.4,
//               hidden: false,
//             });
//           }
        
     
//       }

//     })

   
//   });

//   if (this.LinechartInstance) {
//     this.allSensorData1.labels = latestDateTime;
//     this.LinechartInstance.data.labels = latestDateTime;
//     // this.LinechartInstance.data.datasets = [...this.allSensorData1.datasets]; // Update datasets
//     this.LinechartInstance.update();
//   }

//   if (this.LineChartSingle) {
//     this.allSensorData2.labels = latestDateTime;
//     this.LineChartSingle.data.labels = latestDateTime;
//     // this.LineChartSingle.data.datasets = [...this.allSensorData2.datasets]; // Update datasets
//     this.LineChartSingle.update();
//   }
// }

// updateChart() {
//   const latestDateTime = this.sensorDataIn['dateTime'].slice(-60);



//   this.filteredControls.forEach((control: any) => {
//     const params = control.graph.params;

//     params.forEach((param: any) => {
//       const labelName = param.graph_label;

//       if (labelName in this.sensorDataIn) {
//         const sensorData = this.sensorDataIn[labelName];

//         const existingDatasetIndex = this.dynamicChartData.findIndex(
//           (chartData: any) => chartData.label === labelName
//         );

//         if (existingDatasetIndex !== -1) {
//           // Update existing dataset in dynamicChartData
//           this.dynamicChartData[existingDatasetIndex].datasets[0].data = [...sensorData];
//         } else {
//           // Add new dataset to dynamicChartData
//           this.dynamicChartData.push({
//             label: labelName,
//             datasets: [{
//               label: labelName,
//               data: [...sensorData],
//               borderColor: param.graph_color,
//               borderWidth: 2,
//               fill: false,
//             }]
//           });
//         }
//       }
//     });
//   });

//   console.log('data', this.dynamicChartData)

//   // Update each chart in the charts array
//   this.charts.forEach((chart, i) => {
//     const updatedData = this.dynamicChartData[i];
//     chart.data.labels = latestDateTime;
//     chart.data.datasets = updatedData.datasets;
//     chart.update();
//   });
// }

// updateChart() {
 

//   if (!this.chartsInitialized) {
//     // Charts haven't been initialized yet, wait for it
//     setTimeout(() => this.updateChart(), 100);
//     return;
//   }

//   const latestDateTime = this.sensorDataIn['dateTime'].slice(-60);

//   this.filteredControls.forEach((control: any, index: number) => {
//     const datasets = this.createDatasets(control.graph.params);
//     const updatedData = {
//       labels: latestDateTime,
//       datasets,
//     };

//     const chart = this.charts[index];
//     chart.data.labels = updatedData.labels;
//     chart.data.datasets = updatedData.datasets;
//     chart.update();
//   });

// }


  // initializeChart() {
    //   this.filteredControls.forEach((control: any, index: number) => {
    //     // Create a container div for each chart
    //     const chartContainer = document.createElement('div');
    //     chartContainer.className = 'chart-container';
    //     this.chartContainer.nativeElement.appendChild(chartContainer);
    
    //     // Create controls for each chart
    //     this.createControls(chartContainer, index,control.graph.display_name);
    
    //     // Create canvas for the chart
    //     const canvas = this.createCanvasElement(index);
    //     chartContainer.appendChild(canvas);
    
    //     // Create the chart
    //     const newChart = new Chart(canvas, {
    //       type: 'line',
    //       data: {
    //         labels: [],  // Initial empty labels
    //         datasets: this.createDatasets(control.graph.params),
    //       },
    //       options: {
    //         responsive: true,
    //         scales: {
    //           x: {
    //             title: {
    //               display: true,
    //               text: control.graph.x,
    //               color: 'red',
    //             },
    //           },
    //           y: {
    //             title: {
    //               display: true,
    //               text: control.graph.y,
    //               color: 'red',
    //             },
    //           },
    //         },
    //       },
    //     });
    
    //     // Push the new chart to the array
    //     this.charts.push(newChart);

    //   });
    
    //   this.chartsInitialized = true;
    // }
