import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-mqtt-device',
  templateUrl: './mqtt-device.component.html',
  styleUrls: ['./mqtt-device.component.css']
})
export class MqttDeviceComponent implements OnInit {

  title = 'WebSocketMqtt';

jsonData: any;
dataList:any=[]
  chart: any;
  mqttData:any;
  constructor(private webSocketService: WebsocketService) {}

  ngOnInit() {

    this.webSocketService.jsonData$.subscribe((data:any) => {
      this.jsonData = data;
      console.log('bb',this.jsonData)
      if (this.chart) {
        // Destroy the existing chart
        this.chart.destroy();
      }
      this.updateChartData(this.jsonData);
  
    });



    // Initialize the chart

  
      


    this.initChart();
  }

  initChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'ffgf'],
        datasets: [
          {
            label: 'Sample Data 1',
             data: [10,20,40,30,50],
            borderColor: '#007bff',
            fill: false,
          },
          {
            label: 'Sample Data 2',
            data: [10,30,40,20,60],
            borderColor: '#ff0000',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  updateChartData(datadevice:any){
    // if (this.chart) {
    //   // Destroy the existing chart
    //   this.chart.destroy();
    // }
    this.chart = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: datadevice.Time,
        datasets: [
          {
            label: 'Sample Ph',
             data: datadevice.Ph,
            borderColor: '#007bff',
            fill: false,
            tension: 0.4, 
          },
          {
            label: 'Sample Voltage',
            data: datadevice.voltage,
            borderColor: '#ff0000',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Sample DO',
            data: datadevice.DO,
            borderColor: '#ff0998',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Sample Current',
            data: datadevice.Current,
            borderColor: 'black',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Sample Temperature',
            data: datadevice.CPU_TEMPERATURE,
            borderColor: 'green',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Sample Current',
            data: datadevice.ORP,
            borderColor: 'violet',
            fill: false,
            tension: 0.4,
          }, 
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  

sendMessageToServer(message: string) {
  this.webSocketService.sendMessage(message);
}
}










