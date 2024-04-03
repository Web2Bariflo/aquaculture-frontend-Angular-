import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { Chart, ChartTypeRegistry } from 'chart.js';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-device-stats',
  templateUrl: './device-stats.component.html',
  styleUrls: ['./device-stats.component.css']
})
export class DeviceStatsComponent implements OnInit, OnDestroy,AfterViewInit{
  events: string[] = [];
  opened: boolean = true;
  LinechartInstance!: Chart;
  
  title = 'WebSocketMqtt';
  jsonData: any;
  dataList:any=[]
  chart: any;
  mqttData:any;

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


  constructor(public dialog: MatDialog, private router: Router, private webSocketService: WebsocketService) {
    window.onload=()=>{
      console.log('LOADED')
    }
    

  }

  ngOnInit(): void {
       
 
  // Initialize the chart
  this.userStoreData=localStorage.getItem('userData')
  const userDataObject = JSON.parse(this.userStoreData);
  this.userNameProfile=userDataObject.userName
  
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
  
  






