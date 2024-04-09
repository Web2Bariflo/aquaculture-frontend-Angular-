
import { Component, Input, ElementRef, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { data } from 'jquery';
import { MqttServiceWrapper } from 'src/app/mqtt-service-wrapper.service';
import { SharedDataService } from 'src/app/share-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponents {
  @Input() chartParamName: any;
  @Input() graphHeadings: any;
  @Input() deviceIdList: any;
  @Input() subscription: any;
  @Input() receivedMessage: string = '';
  sensorDataIn: any[] = [];
  @Input() childLabels: any;
  @Input() childData: any;
  sharedData: any;
  shareCategories: any;
  chartReady = false;
  chartLabel: string = '';
  @Input() labelName: { [key: string]: string } = {};
  @Input() sensorDataForChild: any;
  sensorData: any;
  parameter: any[] = [];
  categories: any[] = [];
  showChart: boolean = false;




  private updateInterval: any;
  private chart!: Chart;


  @ViewChild('chartContainer') chartContainer!: ElementRef;
  constructor(private mqttServiceWrapper: MqttServiceWrapper, private sharedDataService: SharedDataService, private renderer: Renderer2,) { }


  ngOnInit() {

    this.sharedDataService.sensorData$.subscribe(
      (data) => {
        this.sensorData = data;
        // console.log('Received sensorData in YourComponent:', this.sensorData);
        // this.sensorDataIn = [...this.sensorDataIn,data]
        // console.log(this.sensorDataIn);

        this.updateChart();

      }
    );





    // this.sharedDataService.data$.subscribe(data => {
    //   this.sharedData = data;
    //   // console.log('Shared data in child component:', this.sharedData);
    //   // this.updateChart();
    // });
    // this.sharedDataService.categories$.subscribe(data => {
    //   this.shareCategories = data;
    //   // console.log('Shared data in child component:', this.shareCategories);
    //   // this.updateChart();
    // });
    // console.log('sensorDataforChild', Object.keys(this.sensorDataForChild).find(id => this.sensorDataForChild[id]), this.graphHeadings);


  }

  ngAfterViewInit() {
    this.createChart();
  }
  showChartButton(card: HTMLElement) {
    // this.showChart =!this.showChart
    // const elements = document.querySelectorAll('.chart-download-dropdown');
    // const body = document.body;
    // elements.forEach((element) => {
    // if (this.showChart) {
    //   this.renderer.addClass(element, 'show-chart-download');

    // } else {
    //   this.renderer.removeClass(element, 'show-chart-download');

    // }})
    const dropdown = card.querySelector('.chart-download-dropdown'); // Find the dropdown within the clicked chart card
    dropdown?.classList.toggle('show-chart-download');
  }


  createChart() {

    const chartContainer = this.chartContainer.nativeElement;
    if (chartContainer) {
      const ctx = chartContainer.getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          // labels: this.shareCategories,
          labels: [],
          datasets: [
            // {
            //  label: '',
            //   // data: this.sharedData,
            //   data: [],
            //   borderWidth: 2,
            //   fill: false,
            //   tension: 0.4,
            // }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                filter: function (legendItem, chartData) {
                  // Hide the first legend item
                  return legendItem.index !== 0;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'time',
                color: 'red',
              },
              grid: {
                display: false, // Hide x-axis grid lines
              },
            },
            y: {
              title: {
                display: true,
                text: this.graphHeadings,
                color: 'red',
              },
              ticks: {
                stepSize: 5, // Specify the step size between values
                font: {
                  weight: 'bold', // Set the font-weight
                },
              },
              grid: {
                display: false, // Hide x-axis grid lines
              },

            },

          },
        },
      });

      this.chartReady = true;
    }


  }
  updateChart() {
    if (this.chartReady && this.chart && this.sensorData && this.sensorData.deviceId && this.sensorData.paramType) {
      const deviceId = this.sensorData.deviceId;
      const paramType = this.sensorData.paramType;

      // Check if the deviceId exists in labelName
      if (deviceId in this.labelName) {
        const deviceLabel = this.labelName[deviceId];
        const index = this.graphHeadings.indexOf(paramType);

        if (index !== -1) {
          const paramValue = parseFloat((this.sensorData.paramValue).toFixed(2));
          const dataPoint = this.sensorData.dataPoint.substring(11, 19);
          // this.categories=[...this.categories,dataPoint]


          // Check if dataset with label exists, if not create one
          let dataset = this.chart.data.datasets.find((dataset) => dataset.label === deviceLabel);
          if (!dataset) {
            dataset = {
              label: deviceLabel,
              data: [],
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              // borderColor: color
            };
            this.chart.data.datasets.push(dataset);
          }
          this.chart.update()
          if (this.chart.data && this.chart.data.labels) {
            // Update labels
            if (!this.chart.data.labels.includes(dataPoint)) {
              this.chart.data.labels.push(dataPoint);
            }
          }
          // Update the chart
          this.chart.update();
          // Add data point to the dataset
          dataset.data.push({
            x: dataPoint,
            y: paramValue
          });
          // // Limit data length to 20
           if (this.chart.data.labels && dataset.data.length > 10) {
            dataset.data.shift(); // Remove oldest data point
            this.chart.data.labels.splice(0);
          }
          
          this.chart.update();
        }
      }
    }
  }
}

